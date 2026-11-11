export interface Opportunity {
  id: number;
  customerName: string;
  title: string;
  value: number; // € amount
  stage: "Lead" | "Qualified" | "Proposal" | "Won" | "Lost";
  expectedCloseDate: string; // ISO date
}
