import { config } from './config.js';
import { getRequestId } from './context.js';
import { getMemorySnapshot, getActiveRequestSnapshot, getActiveHandleSnapshot, getEventLoopLagSnapshot, activeTaskStores, inboundHttpSockets } from './runtime.js';
import type { LogLevel, ResourceCategory, TaskContext, TaskStatus } from './types.js';

let runCounter = 0;
let diagnosticsTicker: NodeJS.Timeout | null = null;

export function getRuntimeSnapshot() {
  const activeHttpRequests = activeTaskStores.incoming_http_request.size;
  const activeMysqlQueries = activeTaskStores.mysql_query.size;
  const activeExternalRequests = activeTaskStores.external_http_request.size;
  const activeInternalTasks = activeTaskStores.internal_task.size;
  const activeBackgroundJobs = activeTaskStores.background_job.size;

  return {
    activeTasks: activeHttpRequests + activeMysqlQueries + activeExternalRequests + activeInternalTasks + activeBackgroundJobs,
    activeHttpRequests,
    activeMysqlQueries,
    activeExternalRequests,
    activeInternalTasks,
    activeBackgroundJobs,
    inboundHttpSockets: inboundHttpSockets.size,
    socketMetricScope: 'inbound_http_server_connections_only',
    ...getActiveRequestSnapshot(),
    ...getActiveHandleSnapshot(),
    ...getMemorySnapshot(),
    ...getEventLoopLagSnapshot(),
  };
}

function emit(level: LogLevel, event: string, payload: Record<string, unknown> = {}) {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    instanceId: config.instanceId,
    pid: process.pid,
    ...payload,
  });

  if (level === 'error') {
    console.error(line);
    return;
  }
  if (level === 'warn') {
    console.warn(line);
    return;
  }
  if (level === 'debug') {
    if (config.profile === 'deep') console.log(line);
    return;
  }
  console.log(line);
}

export function beginTrackedTask(taskName: string, resourceCategory: ResourceCategory = 'internal_task', meta: Record<string, unknown> = {}) {
  if (!config.enabled) {
    return {
      runId: 'disabled',
      complete: () => {},
      fail: () => {},
      abort: () => {},
    };
  }

  const store = activeTaskStores[resourceCategory] || activeTaskStores.internal_task;
  const runId = `${config.instanceId}:${taskName}:${++runCounter}`;
  const startedAt = new Date().toISOString();
  const startedAtMs = Date.now();
  const requestId = getRequestId();
  let settled = false;

  store.add(runId);

  const taskContext: TaskContext = {
    taskName,
    runId,
    resourceCategory,
    startedAt,
    startedAtMs,
    requestId,
    meta,
  };

  // Only emit start event in deep profile or if explicitly required
  if (config.profile === 'deep') {
    emit('debug', 'observability_task_started', {
      ...taskContext,
      status: 'started',
      ...getRuntimeSnapshot(),
    });
  }

  const finalize = (level: LogLevel, status: TaskStatus, extra: Record<string, unknown> = {}) => {
    if (settled) return;
    settled = true;
    store.delete(runId);

    const finishedAtMs = Date.now();
    const durationMs = finishedAtMs - startedAtMs;

    // Slow task detection
    let isSlow = false;
    if (resourceCategory === 'incoming_http_request' && durationMs > config.thresholds.slowHttpMs) isSlow = true;
    if (resourceCategory === 'mysql_query' && durationMs > config.thresholds.slowDbMs) isSlow = true;
    if (resourceCategory === 'external_http_request' && durationMs > config.thresholds.slowExternalMs) isSlow = true;

    // Force info/warn if slow or failed, regardless of profile
    const effectiveLevel = (status === 'failed' || status === 'aborted') ? level : (isSlow ? 'warn' : level);
    const eventName = isSlow ? 'observability_slow_task' : 'observability_task_finished';

    // Apply sampling for normal requests in standard/minimal profile
    const shouldLog = 
      effectiveLevel !== 'info' || 
      config.profile === 'deep' || 
      Math.random() <= config.sampleRate;

    if (shouldLog) {
      emit(effectiveLevel, eventName, {
        ...taskContext,
        finishedAt: new Date(finishedAtMs).toISOString(),
        durationMs,
        status,
        ...getRuntimeSnapshot(),
        ...extra,
      });
    }
  };

  return {
    runId,
    complete(extra: Record<string, unknown> = {}) {
      finalize('info', 'completed', extra);
    },
    fail(extra: Record<string, unknown> = {}) {
      finalize('error', 'failed', extra);
    },
    abort(extra: Record<string, unknown> = {}) {
      finalize('warn', 'aborted', extra);
    },
  };
}

export function startObservabilityTicker() {
  if (!config.enabled || config.profile === 'off') {
    return null;
  }

  if (diagnosticsTicker) {
    return diagnosticsTicker;
  }

  diagnosticsTicker = setInterval(() => {
    emit('info', 'observability_snapshot', {
      status: 'pending',
      resourceCategory: 'runtime_probe',
      ...getRuntimeSnapshot(),
    });
  }, config.snapshotIntervalMs);

  if (typeof diagnosticsTicker.unref === 'function') {
    diagnosticsTicker.unref();
  }

  return diagnosticsTicker;
}

export function stopObservabilityTicker() {
  if (diagnosticsTicker) {
    clearInterval(diagnosticsTicker);
    diagnosticsTicker = null;
  }
}
