import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartData } from "chart.js";
import { MatCardModule } from "@angular/material/card";
import { OpportunityService } from "../../../../services/opportunity.service";

@Component({
  selector: "app-opportunities-chart",
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Pipeline by Stage</mat-card-title>
        <mat-card-subtitle>Total value (€) per stage</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <canvas
          baseChart
          [type]="'bar'"
          [data]="chartData()"
          [options]="chartOptions"
        >
        </canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      canvas {
        max-height: 320px;
      }
    `,
  ],
})
export class OpportunitiesChartComponent {
  private readonly service = inject(OpportunityService);

  readonly chartData = computed<ChartData<"bar">>(() => {
    const totals = this.service.totalsByStage();
    return {
      labels: totals.map((t) => t.stage),
      datasets: [
        {
          label: "Total value (€)",
          data: totals.map((t) => t.total),
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
  });

  readonly chartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
}
