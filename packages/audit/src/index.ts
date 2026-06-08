import { newId, nowIso } from '@elo/core';
import type { AuditAction, AuditEntry } from '@elo/core';
import { getStorage } from '@elo/storage';

export interface AuditContext {
  actorId: string;
  actorRole: AuditEntry['actorRole'];
  ipHash?: string;
  ua?: string;
  requestId?: string;
}

export function diffObjects<T extends object>(
  before: T | undefined,
  after: T | undefined,
  /** Optionaler Whitelist-Filter; nur diese Keys werden geprüft. */
  onlyKeys?: readonly (keyof T | string)[],
): Record<string, { from: unknown; to: unknown }> | undefined {
  if (!before || !after) return undefined;
  const b = before as Record<string, unknown>;
  const a = after as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(b), ...Object.keys(a)]);
  const keys = onlyKeys?.length
    ? (onlyKeys as readonly string[]).filter((k) => allKeys.has(k))
    : Array.from(allKeys);
  const out: Record<string, { from: unknown; to: unknown }> = {};
  for (const k of keys) {
    if (JSON.stringify(b[k]) !== JSON.stringify(a[k])) {
      out[k] = { from: b[k], to: a[k] };
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export async function logAudit(args: {
  ctx: AuditContext;
  action: AuditAction;
  entity: AuditEntry['entity'];
  entityId: string;
  diff?: Record<string, { from: unknown; to: unknown }>;
}): Promise<void> {
  const storage = getStorage();
  const entry: AuditEntry = {
    id: newId('aud'),
    createdAt: nowIso(),
    actorId: args.ctx.actorId,
    actorRole: args.ctx.actorRole,
    action: args.action,
    entity: args.entity,
    entityId: args.entityId,
    ...(args.diff !== undefined ? { diff: args.diff } : {}),
    ...(args.ctx.ipHash !== undefined ? { ipHash: args.ctx.ipHash } : {}),
    ...(args.ctx.ua !== undefined ? { ua: args.ctx.ua } : {}),
    ...(args.ctx.requestId !== undefined ? { requestId: args.ctx.requestId } : {}),
  };
  await storage.appendAudit(entry);
}
