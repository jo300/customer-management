import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { OpportunityService } from "../../../../services/opportunity.service";
import { OpportunitiesChartComponent } from "../opportunities-chart/opportunities-chart.component";

@Component({
  selector: "app-opportunities",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    OpportunitiesChartComponent,
  ],
  template: `
    <div class="opps-page">
      <app-opportunities-chart></app-opportunities-chart>

      <mat-card>
        <mat-card-header>
          <mat-card-title>All Opportunities</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table
            mat-table
            [dataSource]="service.opportunities()"
            class="opps-table"
          >
            <ng-container matColumnDef="customer"
              ><th mat-header-cell *matHeaderCellDef>Customer</th>
              <td mat-cell *matCellDef="let o">
                {{ o.customerName }}
              </td></ng-container
            >
            <ng-container matColumnDef="title"
              ><th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let o">{{ o.title }}</td></ng-container
            >
            <ng-container matColumnDef="stage"
              ><th mat-header-cell *matHeaderCellDef>Stage</th>
              <td mat-cell *matCellDef="let o">{{ o.stage }}</td></ng-container
            >
            <ng-container matColumnDef="value"
              ><th mat-header-cell *matHeaderCellDef>Value</th>
              <td mat-cell *matCellDef="let o">
                {{ o.value | currency: "EUR" : "symbol" : "1.0-0" }}
              </td></ng-container
            >
            <ng-container matColumnDef="close"
              ><th mat-header-cell *matHeaderCellDef>Expected Close</th>
              <td mat-cell *matCellDef="let o">
                {{ o.expectedCloseDate }}
              </td></ng-container
            >
            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .opps-page {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .opps-table {
        width: 100%;
      }
    `,
  ],
})
export class OpportunitiesComponent {
  readonly service = inject(OpportunityService);
  readonly cols = ["customer", "title", "stage", "value", "close"];
}
