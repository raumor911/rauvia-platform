export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export type ResourceCategory = 
  | 'incoming_http_request'
  | 'mysql_query'
  | 'external_http_request'
  | 'post_response_internal_task'
  | 'internal_task'
  | 'background_job'
  | 'runtime_probe'
  | 'shutdown_task';

export type TaskStatus = 'started' | 'completed' | 'failed' | 'aborted';

export interface ObservabilityConfig {
  enabled: boolean;
  profile: 'off' | 'minimal' | 'standard' | 'deep';
  instanceId: string;
  snapshotIntervalMs: number;
  sampleRate: number;
  thresholds: {
    slowHttpMs: number;
    slowDbMs: number;
    slowExternalMs: number;
  };
}

export interface TaskContext {
  taskName: string;
  runId: string;
  resourceCategory: ResourceCategory;
  startedAt: string;
  startedAtMs: number;
  requestId?: string;
  meta: Record<string, unknown>;
}

export interface RuntimeSnapshot {
  pid: number;
  activeTasks: number;
  activeHttpRequests: number;
  activeMysqlQueries: number;
  activeExternalRequests: number;
  activeInternalTasks: number;
  inboundHttpSockets: number;
  socketMetricScope: string;
  activeRequests: number;
  activeHandles: number;
  handleTypes: Record<string, number>;
  rssMb?: number;
  heapUsedMb?: number;
  eventLoopLagMs?: number;
}
