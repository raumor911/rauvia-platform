import mysql from 'mysql2/promise';
import { beginTrackedTask } from './observability/index.js';

/**
 * Secure MySQL Database Connection Module
 * 
 * SECURITY BEST PRACTICES IMPLEMENTED:
 * 1. Server-side only: uses server-only environment variables (never prefixed with VITE_).
 * 2. Connection Pooling: uses mysql2/promise createPool for resilience, auto-reconnect, and concurrency.
 * 3. Lazy Initialization: avoids crashing the Node server on boot if environment variables are missing.
 * 4. Prepared Statements / Parameterized Queries: prevents SQL injection.
 * 5. Sanitized Error Handling: strips passwords and sensitive information before throwing or logging.
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password?: string;
}

let pool: mysql.Pool | null = null;

/**
 * Retrieves the database configuration from environment variables.
 * None of these variables are exposed to the client/browser.
 */
export function getDbConfig(): DatabaseConfig {
  let host = process.env.DB_HOST?.trim() || 'srv1999.hstgr.io';
  // Use srv1999.hstgr.io when host is empty or set to local container defaults
  if (!host || host === 'localhost' || host === '127.0.0.1') {
    host = 'srv1999.hstgr.io';
  }
  const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
  const database = process.env.DB_NAME || '';
  const user = process.env.DB_USER || '';
  const password = process.env.DB_PASSWORD || '';

  return {
    host,
    port: isNaN(port) ? 3306 : port,
    database,
    user,
    password,
  };
}

/**
 * Returns whether all essential DB environment variables are configured.
 */
export function isDbConfigured(): boolean {
  const { host, database, user } = getDbConfig();
  return Boolean(host && database && user);
}

/**
 * Obtains or creates the singleton MySQL connection pool.
 * Lazy initialization ensures the server starts even if MySQL credentials
 * have not yet been provided in the environment.
 */
export function getDbPool(): mysql.Pool {
  if (!pool) {
    const config = getDbConfig();

    if (!config.user || !config.database) {
      console.warn(
        '[Database Warning] DB_USER and/or DB_NAME are not defined in the environment. Queries may fail until configured.'
      );
    }

    pool = mysql.createPool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 5000, // Evita conexiones colgadas por más de 5 segundos
    });
  }

  return pool;
}

/**
 * Safely executes a parameterized SQL query.
 * Always use parameterized placeholders (?) to prevent SQL injection.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const activePool = getDbPool();
  const queryTask = beginTrackedTask('mysql_query', 'mysql_query', {
    resource: 'mysql_query', queryKind: sql.trim().split(/\s+/, 1)[0]?.toUpperCase() || 'UNKNOWN', paramsCount: params.length,
  });
  let timeoutId: NodeJS.Timeout | null = null;
  let connection: mysql.PoolConnection | null = null;
  
  try {
    connection = await activePool.getConnection();

    // Timeout estricto de 5 segundos por query para evitar colgar el event loop
    const queryPromise = connection.execute(sql, params);
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error('Query Timeout exceeded 5000ms')), 5000);
    });
    
    const [results] = await Promise.race([queryPromise, timeoutPromise]) as [any, any];
    queryTask.complete();
    return results as T;
  } catch (error: any) {
    // Si la promesa rechazada es el timeout, destruimos la conexión para abortar 
    // la ejecución en el lado del servidor MySQL y liberar inmediatamente el socket.
    if (connection && error.message.includes('Query Timeout')) {
      connection.destroy();
      connection = null; // Lo marcamos nulo para que el finally no intente hacer release()
    }

    // Sanitize error message to prevent accidental credential leakage in logs
    const sanitizedMessage = (error.message || 'Unknown database error').replace(
      /password=([^\s&]+)/gi,
      'password=****'
    );
    queryTask.fail({ error: sanitizedMessage });
    console.error('[Database Error]', sanitizedMessage);
    throw new Error(sanitizedMessage);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Health check function to test database connectivity.
 * Returns safe metadata without ever revealing DB_PASSWORD.
 */
export async function testConnection(): Promise<{
  connected: boolean;
  host: string;
  port: number;
  database: string;
  user: string;
  message: string;
  error?: string;
}> {
  const config = getDbConfig();
  const safeStatus = {
    connected: false,
    host: config.host,
    port: config.port,
    database: config.database || '(not set)',
    user: config.user || '(not set)',
    message: '',
  };

  if (!isDbConfigured()) {
    return {
      ...safeStatus,
      message: 'Database environment variables are incomplete. Please configure DB_HOST, DB_PORT, DB_NAME, DB_USER, and DB_PASSWORD.',
    };
  }

  try {
    const activePool = getDbPool();
    // Use simple ping / SELECT 1 test
    await activePool.query('SELECT 1 AS health_check');
    return {
      ...safeStatus,
      connected: true,
      message: 'Successfully connected to MySQL database.',
    };
  } catch (err: any) {
    const sanitizedError = (err.message || 'Connection failed').replace(
      /password=([^\s&]+)/gi,
      'password=****'
    );
    return {
      ...safeStatus,
      connected: false,
      message: 'Failed to connect to MySQL database.',
      error: sanitizedError,
    };
  }
}

/**
 * Gracefully close the database connection pool on server shutdown.
 */
export async function closeDbPool(): Promise<void> {
  if (pool) {
    try {
      await pool.end();
      pool = null;
      console.log('[Database] Connection pool closed successfully.');
    } catch (err) {
      console.error('[Database] Error closing connection pool:', err);
    }
  }
}
