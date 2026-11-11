import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartData } from "chart.js";

import { Customer } from "../../core/models/customer.model";
import { CustomerService } from "../../../services/customer.service";
import { OpportunityService } from "../../../services/opportunity.service";

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, BaseChartDirective],
  templateUrl: "./reports.component.html",
  styleUrl: "./reports.component.scss",
})
export class ReportsComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly opportunityService = inject(OpportunityService);

  // Summary Stats
  totalCustomers = 0;
  totalPipelineValue = 0;
  totalWonValue = 0;

  // Chart Setup
  public barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [
      { data: [], label: "Potential Revenue (€)", backgroundColor: "#3f51b5" },
    ],
  };

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // 1. Fetch Customers
    this.customerService.getCustomers().subscribe((customers) => {
      this.totalCustomers = customers.length;
      this.generateCustomerChart(customers);
    });

    // 2. Fetch Opportunities (Mock Data)
    const opps = this.opportunityService.opportunities();
    this.totalPipelineValue = opps.reduce((sum, o) => sum + o.value, 0);
    this.totalWonValue = opps
      .filter((o) => o.stage === "Won")
      .reduce((sum, o) => sum + o.value, 0);
  }

  private generateCustomerChart(customers: Customer[]): void {
    // Just a fun mock report: Count how many customers per company
    const companyCounts = customers.reduce(
      (acc, c) => {
        const company = c.company || "Unknown";
        acc[company] = (acc[company] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    this.barChartData = {
      labels: Object.keys(companyCounts),
      datasets: [
        {
          data: Object.values(companyCounts),
          label: "Customers per Company",
          backgroundColor: [
            "#42a5f5",
            "#66bb6a",
            "#ffa726",
            "#26a69a",
            "#ef5350",
          ],
        },
      ],
    };
  }
}
