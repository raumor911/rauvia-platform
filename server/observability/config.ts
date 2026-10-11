import crypto from 'node:crypto';
import type { ObservabilityConfig } from './types.js';

export const config: ObservabilityConfig = {
  enabled: process.env.OBSERVABILITY_ENABLED !== '0',
  profile: (process.env.OBSERVABILITY_PROFILE as any) || 'standard',
  instanceId: process.env.OBSERVABILITY_INSTANCE_ID?.trim() || crypto.randomUUID(),
  snapshotIntervalMs: Number(process.env.OBSERVABILITY_SNAPSHOT_INTERVAL_MS) || 60000,
  sampleRate: Number(process.env.OBSERVABILITY_SAMPLE_RATE) || 1.0,
  thresholds: {
    slowHttpMs: Number(process.env.OBSERVABILITY_SLOW_HTTP_MS) || 2000,
    slowDbMs: Number(process.env.OBSERVABILITY_SLOW_DB_MS) || 1000,
    slowExternalMs: Number(process.env.OBSERVABILITY_SLOW_EXTERNAL_MS) || 5000,
  },
};
