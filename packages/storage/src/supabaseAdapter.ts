import type { StorageAdapter } from './types';

/**
 * Skeleton: wird in Phase 2 mit @supabase/supabase-js verdrahtet.
 * Methoden werfen NotImplemented, damit das Storage-Setup deutlich auf den
 * Konfigurations-Fehler hinweist und nicht still einen leeren Pfad nimmt.
 */
export function createSupabaseAdapter(_config: { url: string; serviceKey: string }): StorageAdapter {
  const ni =
    (name: string) =>
    async () => {
      throw new Error(`SupabaseAdapter.${name} not implemented yet (Phase 2).`);
    };

  type AnyMethod = (...args: unknown[]) => Promise<unknown>;
  const m = (name: string) => ni(name) as unknown as AnyMethod;

  // Wir bauen das Objekt dynamisch: jede Methode wirft NotImplemented.
  const adapter = {
    createLead: m('createLead'),
    updateLead: m('updateLead'),
    getLead: m('getLead'),
    listLeads: m('listLeads'),
    deleteLead: m('deleteLead'),
    findDuplicate: m('findDuplicate'),
    createResearch: m('createResearch'),
    updateResearch: m('updateResearch'),
    getResearch: m('getResearch'),
    listResearch: m('listResearch'),
    appendAudit: m('appendAudit'),
    listAudit: m('listAudit'),
    getUserByEmail: m('getUserByEmail'),
    getUser: m('getUser'),
    listUsers: m('listUsers'),
    upsertUser: m('upsertUser'),
    updateUser: m('updateUser'),
    appendEvent: m('appendEvent'),
    listEvents: m('listEvents'),
    createPartner: m('createPartner'),
    updatePartner: m('updatePartner'),
    getPartner: m('getPartner'),
    listPartners: m('listPartners'),
    deletePartner: m('deletePartner'),
    createTask: m('createTask'),
    updateTask: m('updateTask'),
    getTask: m('getTask'),
    listTasks: m('listTasks'),
    deleteTask: m('deleteTask'),
    createDeal: m('createDeal'),
    updateDeal: m('updateDeal'),
    getDeal: m('getDeal'),
    listDeals: m('listDeals'),
    createCommission: m('createCommission'),
    updateCommission: m('updateCommission'),
    getCommission: m('getCommission'),
    listCommissions: m('listCommissions'),
  };

  return adapter as unknown as StorageAdapter;
}
