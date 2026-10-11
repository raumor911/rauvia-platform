type LogLevel = 'info' | 'warn' | 'error';

type LogMeta = Record<string, unknown>;

export function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  return {
    message: typeof error === 'string' ? error : 'Unknown error',
  };
}

export function logEvent(level: LogLevel, event: string, meta: LogMeta = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    ...meta,
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
}
