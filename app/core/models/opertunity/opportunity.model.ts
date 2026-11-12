export interface Opportunity {
  id: number;
  customerName: string;
  title: string;
  value: number;
  stage: "Lead" | "Qualified" | "Proposal" | "Won" | "Lost";
  expectedCloseDate: string;
}
