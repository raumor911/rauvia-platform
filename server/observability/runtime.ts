import type { Server } from 'node:http';
import type { Socket } from 'node:net';
import { monitorEventLoopDelay } from 'node:perf_hooks';
import type { ResourceCategory } from './types.js';

export const activeTaskStores: Record<ResourceCategory, Set<string>> = {
  incoming_http_request: new Set(),
  mysql_query: new Set(),
  external_http_request: new Set(),
  post_response_internal_task: new Set(),
  internal_task: new Set(),
  background_job: new Set(),
  runtime_probe: new Set(),
  shutdown_task: new Set(),
};

export const inboundHttpSockets = new Set<Socket>();

const eventLoopHistogram = monitorEventLoopDelay({ resolution: 20 });
eventLoopHistogram.enable();

export function attachInboundHttpSocketTracking(server: Server) {
  server.on('connection', (socket: Socket) => {
    inboundHttpSockets.add(socket);
    socket.on('close', () => {
      inboundHttpSockets.delete(socket);
    });
  });
}

export function destroyAllInboundHttpSockets() {
  for (const socket of inboundHttpSockets) {
    socket.destroy();
  }
  inboundHttpSockets.clear();
}

export function getActiveHandleSnapshot() {
  const getter = (process as any)._getActiveHandles;
  if (typeof getter !== 'function') {
    return { activeHandles: 0, handleTypes: {} };
  }

  const handles = getter.call(process) || [];
  const handleTypes: Record<string, number> = {};

  for (const handle of handles) {
    const type = handle?.constructor?.name || typeof handle;
    handleTypes[type] = (handleTypes[type] || 0) + 1;
  }

  return {
    activeHandles: handles.length,
    handleTypes,
  };
}

export function getActiveRequestSnapshot() {
  const getter = (process as any)._getActiveRequests;
  if (typeof getter !== 'function') {
    return { activeRequests: 0 };
  }

  const requests = getter.call(process) || [];
  return { activeRequests: requests.length };
}

export function getMemorySnapshot() {
  const mem = process.memoryUsage();
  return {
    rssMb: Math.round(mem.rss / 1024 / 1024),
    heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
  };
}

export function getEventLoopLagSnapshot() {
  // Convertimos de nanosegundos a milisegundos
  return {
    eventLoopLagMs: Math.round(eventLoopHistogram.mean / 1e6),
  };
}
