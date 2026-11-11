import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { Customer, CustomerPayload } from "../../../core/models/customer.model";
import { CustomerService } from "../../../../services/customer.service";
import { NotificationService } from "../../../../services/notification.service";
import PhoneFormatPipe from "../../../shared/pipes/phone-format.pipe";

@Component({
  selector: "app-customer-details",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CustomerFormComponent,
    PhoneFormatPipe,
  ],

  templateUrl: "./customer-details.component.html",
  styleUrl: "./customer-details.component.scss",
})
export class CustomerDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(CustomerService);
  private readonly notify = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  customer: Customer | null = null;
  isLoading = true;
  isEditing = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    const id = Number(idParam);
    if (!idParam || Number.isNaN(id)) {
      this.notify.error("Invalid customer id");
      this.router.navigate(["/customers"]);
      return;
    }
    this.load(id);
  }

  private load(id: number): void {
    this.isLoading = true;
    this.service
      .getCustomerById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (c) => {
          this.customer = c;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notify.error("Customer not found");
          this.router.navigate(["/customers"]);
        },
      });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
  }

  onSave(payload: CustomerPayload): void {
    if (!this.customer) return;
    this.service
      .updateCustomer(this.customer.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.customer = updated;
          this.isEditing = false;
          this.notify.success("Customer updated");
        },
        error: () => this.notify.error("Update failed"),
      });
  }

  onBack(): void {
    this.router.navigate(["/customers"]);
  }
}
