/* eslint-disable no-console */
import {
  newId,
  nowIso,
  type Commission,
  type CommissionId,
  type Deal,
  type DealId,
  type LeadId,
  type Partner,
  type PartnerId,
  type Task,
  type TaskId,
} from '@elo/core';
import { getStorage } from '@elo/storage';

/**
 * Additiver Seed für die Operations-Center-Demo:
 *  - 3 Vertriebspartner (aktiv / pausiert / voll)
 *  - vorhandene Demo-Leads werden Partnern zugewiesen
 *  - 1 bestätigter Abschluss + offene Provision
 *  - 2 Aufgaben (heute / wartet)
 *
 * Idempotent: Existiert ein Partner mit gleichem Namen, wird nichts neu
 * angelegt. Dadurch ist mehrfaches Ausführen sicher.
 */

async function ensurePartner(args: {
  name: string;
  email: string;
  phone?: string;
  regionLabel: string;
  regionPrefixes: string[];
  specialties: Partner['specialties'];
  capacity: number;
  status: Partner['status'];
  routingWeight?: number;
  isDemo?: boolean;
}): Promise<Partner> {
  const storage = getStorage();
  const all = await storage.listPartners();
  const existing = all.find((p) => p.name === args.name);
  if (existing) return existing;
  const partner: Partner = {
    id: newId('prt') as PartnerId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    name: args.name,
    email: args.email,
    phone: args.phone,
    regionLabel: args.regionLabel,
    regionPrefixes: args.regionPrefixes,
    specialties: args.specialties,
    capacity: args.capacity,
    status: args.status,
    routingWeight: args.routingWeight,
    isDemo: args.isDemo ?? true,
  };
  return storage.createPartner(partner);
}

async function main() {
  const storage = getStorage();

  console.log('Seeding Operations-Center demo data …');

  const p1 = await ensurePartner({
    name: 'Demo · Berlin Energie Team',
    email: 'berlin@partner.demo',
    phone: '+49 30 0000111',
    regionLabel: 'Berlin / Brandenburg',
    regionPrefixes: ['10', '11', '12', '13', '14', '15'],
    specialties: ['strom', 'gas', 'strom_gas'],
    capacity: 25,
    status: 'active',
    routingWeight: 8,
  });
  const p2 = await ensurePartner({
    name: 'Demo · Süd Solar GmbH',
    email: 'sued@partner.demo',
    phone: '+49 89 0000222',
    regionLabel: 'Bayern / München',
    regionPrefixes: ['80', '81', '82', '83', '84', '85'],
    specialties: ['photovoltaik', 'strom'],
    capacity: 18,
    status: 'active',
    routingWeight: 5,
  });
  const p3 = await ensurePartner({
    name: 'Demo · Nord Gewerbe Pro',
    email: 'nord@partner.demo',
    phone: '+49 40 0000333',
    regionLabel: 'Hamburg / Norddeutschland',
    regionPrefixes: ['20', '21', '22', '24'],
    specialties: ['gewerbe', 'strom_gas'],
    capacity: 12,
    status: 'paused',
    routingWeight: 3,
  });
  console.log(`  Partner: ${p1.name}, ${p2.name}, ${p3.name}`);

  // Bestehende Demo-Leads holen und ggf. verteilen
  const allLeads = await storage.listLeads();
  const demoLeads = allLeads.filter((l) => l.isDemo);

  for (const lead of demoLeads) {
    if (lead.assignedPartnerId) continue;
    let target: PartnerId | null = null;
    if (lead.postalCode.startsWith('1')) target = p1.id;
    else if (lead.postalCode.startsWith('8')) target = p2.id;
    else if (lead.postalCode.startsWith('2')) target = p3.id;
    if (!target) target = p1.id;
    await storage.updateLead(lead.id, {
      assignedPartnerId: target,
      assignedAt: nowIso(),
      status: lead.status === 'Neu' ? 'Priorisiert' : lead.status,
    });
  }
  console.log(`  ${demoLeads.length} Demo-Leads zugewiesen (additiv).`);

  // Wenn es einen Demo-Lead bei p2 gibt, Abschluss + Provision anlegen
  const target = demoLeads.find((l) => l.postalCode.startsWith('8'));
  if (target) {
    const existingDeal = (await storage.listDeals({ leadId: target.id as LeadId })).find(
      (d) => d.status === 'confirmed',
    );
    let dealId: DealId;
    if (!existingDeal) {
      const deal: Deal = {
        id: newId('deal') as DealId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        leadId: target.id,
        partnerId: p2.id,
        product: 'photovoltaik',
        productLabel: 'PV 8 kWp + Speicher',
        status: 'confirmed',
        value: 18_400,
        expectedCommission: 920,
        notes: 'Demo-Abschluss · 8 kWp Anlage inkl. Speicher.',
        closedAt: nowIso(),
        reportedBy: 'demo-seed',
        reviewedBy: 'demo-seed',
      };
      await storage.createDeal(deal);
      dealId = deal.id;
      await storage.updateLead(target.id, { status: 'Abgeschlossen', closedAt: nowIso() });
      console.log(`  Demo-Abschluss angelegt für Lead ${target.firstName} ${target.lastName}`);
    } else {
      dealId = existingDeal.id;
    }

    const existingCommission = (await storage.listCommissions({ partnerId: p2.id })).find(
      (c) => c.dealId === dealId,
    );
    if (!existingCommission) {
      const commission: Commission = {
        id: newId('com') as CommissionId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        dealId,
        partnerId: p2.id,
        amount: 920,
        currency: 'EUR',
        status: 'pending',
      };
      await storage.createCommission(commission);
      console.log('  Demo-Provision (offen) angelegt');
    }
  }

  // Demo-Aufgaben
  const existingTasks = await storage.listTasks();
  const hasDemo = existingTasks.some((t) => t.title.startsWith('Demo · '));
  if (!hasDemo) {
    const lead1 = demoLeads.find((l) => l.postalCode.startsWith('1'));
    const lead2 = demoLeads.find((l) => l.postalCode.startsWith('2'));
    const tasks: Task[] = [];
    if (lead1) {
      tasks.push({
        id: newId('tsk') as TaskId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        title: 'Demo · Anna Berger heute zurückrufen',
        description: 'Photovoltaik-Beratung. Hat Rechnung hochgeladen, möglichst zeitnah anrufen.',
        kind: 'call',
        status: 'today',
        priority: 'urgent',
        leadId: lead1.id,
        partnerId: p1.id,
        ownerId: 'demo-seed',
        createdBy: 'demo-seed',
        dueAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });
    }
    if (lead2) {
      tasks.push({
        id: newId('tsk') as TaskId,
        createdAt: nowIso(),
        updatedAt: nowIso(),
        title: 'Demo · Karl Test – Unterlagen anfordern',
        description: 'Letzte Stromrechnung anfordern, dann scoring nochmal prüfen.',
        kind: 'document',
        status: 'waiting',
        priority: 'normal',
        leadId: lead2.id,
        partnerId: p3.id,
        ownerId: 'demo-seed',
        createdBy: 'demo-seed',
      });
    }
    for (const t of tasks) await storage.createTask(t);
    console.log(`  ${tasks.length} Demo-Aufgaben angelegt`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
