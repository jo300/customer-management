import { Injectable, signal } from "@angular/core";
import { Opportunity } from "../app/core/models/opertunity/opportunity.model";

@Injectable({ providedIn: "root" })
export class OpportunityService {
  private readonly _opportunities = signal<Opportunity[]>([
    {
      id: 1,
      customerName: "John Doe",
      title: "CRM rollout",
      value: 12000,
      stage: "Proposal",
      expectedCloseDate: "2026-01-15",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      title: "Support contract",
      value: 4500,
      stage: "Qualified",
      expectedCloseDate: "2025-12-01",
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      title: "Data migration",
      value: 8500,
      stage: "Lead",
      expectedCloseDate: "2026-02-20",
    },
    {
      id: 4,
      customerName: "Alice Brown",
      title: "Training package",
      value: 3000,
      stage: "Won",
      expectedCloseDate: "2025-11-30",
    },
    {
      id: 5,
      customerName: "Charlie Davis",
      title: "Custom module",
      value: 15000,
      stage: "Proposal",
      expectedCloseDate: "2026-03-10",
    },
    {
      id: 6,
      customerName: "John Doe",
      title: "Renewal",
      value: 6000,
      stage: "Won",
      expectedCloseDate: "2025-12-20",
    },
  ]);

  readonly opportunities = this._opportunities.asReadonly();

  /** Aggregated value per stage — used by the chart */
  totalsByStage(): { stage: string; total: number }[] {
    const map = new Map<string, number>();
    for (const o of this._opportunities()) {
      map.set(o.stage, (map.get(o.stage) ?? 0) + o.value);
    }
    return Array.from(map, ([stage, total]) => ({ stage, total }));
  }
}
