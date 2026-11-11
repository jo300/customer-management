import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmData,
} from "../delete-confirm-dialog/delete-confirm-dialog.component";
import { Customer, CustomerPayload } from "../../../core/models/customer.model";
import { CustomerService } from "../../../../services/customer.service";
import { NotificationService } from "../../../../services/notification.service";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: "app-customer-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDivider,
    MatProgressSpinnerModule,
    CustomerFormComponent,
  ],
  templateUrl: "./customer-list.component.html",
  styleUrl: "./customer-list.component.scss",
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dataService = inject(CustomerService);
  private readonly notify = inject(NotificationService);

  readonly displayedColumns = [
    "firstName",
    "lastName",
    "email",
    "company",
    "actions",
  ];

  readonly searchControl = new FormControl<string>("", { nonNullable: true });

  /** MatTableDataSource wraps the array — enables paginator + filter */
  readonly dataSource = new MatTableDataSource<Customer>([]);

  /** Paginator must attach after the view renders */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allCustomers: Customer[] = [];
  editingCustomer: Customer | null = null;
  isLoading = false;

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.applyFilter());
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadCustomers(): void {
    this.isLoading = true;
    this.dataService
      .getCustomers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (customers) => {
          this.allCustomers = customers;
          this.applyFilter();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.notify.error("Failed to load customers");
        },
      });
  }

  /** Sets the filtered rows on the MatTableDataSource */
  private applyFilter(): void {
    const q = this.searchControl.value.trim().toLowerCase();
    const rows = !q
      ? this.allCustomers
      : this.allCustomers.filter(
          (c) =>
            c.firstName.toLowerCase().includes(q) ||
            c.lastName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            (c.company ?? "").toLowerCase().includes(q),
        );
    this.dataSource.data = rows;
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  // --- Create / Update (unchanged logic, re-fetch after) ---
  onFormSubmit(payload: CustomerPayload): void {
    const op = this.editingCustomer
      ? this.dataService.updateCustomer(this.editingCustomer.id, payload)
      : this.dataService.createCustomer(payload);

    op.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.notify.success("Customer saved");
        this.closeForm();
        this.loadCustomers();
      },
      error: () => this.notify.error("Save failed"),
    });
  }

  // --- Delete ---
  deleteCustomer(customer: Customer): void {
    const data: DeleteConfirmData = {
      customerName: `${customer.firstName} ${customer.lastName}`,
    };
    this.dialog
      .open(DeleteConfirmDialogComponent, { data, width: "400px" })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return;
        this.dataService
          .deleteCustomer(customer.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.notify.success("Customer deleted");
              this.loadCustomers();
            },
            error: () => this.notify.error("Delete failed"),
          });
      });
  }

  // --- UI helpers ---
  onAddClick(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "500px",
      disableClose: true,
      data: {
        mode: "create",
        existingCustomers: this.allCustomers,
      },
    });

    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.dataService.createCustomer(payload).subscribe({
          next: () => {
            this.notify.success("Customer created");
            this.loadCustomers();
          },
          error: () => this.notify.error("Create failed"),
        });
      }
    });
  }

  onEdit(customer: Customer): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: "500px",
      disableClose: true,
      data: {
        mode: "edit",
        customer: { ...customer },
        existingCustomers: this.allCustomers,
      },
    });

    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.dataService.updateCustomer(customer.id, payload).subscribe({
          next: () => {
            this.notify.success("Customer updated");
            this.loadCustomers();
          },
          error: () => this.notify.error("Update failed"),
        });
      }
    });
  }

  onFormCancel(): void {
    this.closeForm();
  }

  private closeForm(): void {
    this.editingCustomer = null;
  }
}
