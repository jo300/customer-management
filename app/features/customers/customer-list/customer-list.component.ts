import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer, CustomerPayload } from '../../../core/models/customer.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  DeleteConfirmDialogComponent,
  DeleteConfirmData,
} from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CustomerFormComponent,
    MatDialogModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent {
  constructor(private dialog: MatDialog) {}
  formShow: boolean = false;
  editingCustomer: Customer | null = null;

  readonly displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'company',
    'actions',
  ];
  dataSource: Customer[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: ' Doe',
      email: 'John@gmail.com',
      phone: '123-456-7890',
      company: 'ABC Inc.',
    },
    {
      id: 2,
      firstName: 'Jane ',
      lastName: ' Smith',

      email: 'Jane@gmail.com',
      phone: '987-654-3210',
      company: 'XYZ Ltd.',
    },
    {
      id: 3,
      firstName: 'Bob ',
      lastName: ' Johnson',

      email: 'bob@gmail.com',
      phone: '555-555-5555',
      company: 'Acme Corp.',
    },
    {
      id: 4,
      firstName: 'Alice ',
      lastName: 'Brown',
      email: 'alice@gmail.com',
      phone: '111-222-3333',
      company: 'Tech Solutions',
    },

    {
      id: 5,
      firstName: 'Charlie ',
      lastName: ' Davis',
      email: 'charli@gmail.com',
      phone: '444-555-6666',
      company: 'Innovatech',
    },
  ];
  onEdit(customer: Customer): void {
    this.editingCustomer = { ...customer }; // copy so Cancel doesn't mutate
    this.formShow = true;
  }
  // --- Single handler for create AND edit ---
  onFormSubmit(payload: CustomerPayload): void {
    if (this.editingCustomer) {
      // UPDATE
      const id = this.editingCustomer.id;
      this.dataSource = this.dataSource.map((c) =>
        c.id === id ? { id, ...payload } : c,
      );
    } else {
      // CREATE
      const nextId = this.dataSource.length
        ? Math.max(...this.dataSource.map((c) => c.id)) + 1
        : 1;
      this.dataSource = [...this.dataSource, { id: nextId, ...payload }];
    }
    this.closeForm();
  }

  onFormCancel(): void {
    this.closeForm();
  }

  private closeForm(): void {
    this.formShow = false;
    this.editingCustomer = null;
  }

  deleteCustomer(customer: Customer) {
    const data: DeleteConfirmData = {
      customerName: `${customer.firstName} ${customer.lastName}`,
    };

    this.dialog
      .open(DeleteConfirmDialogComponent, {
        data,
        width: '400px',
        disableClose: false,
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          const index = this.dataSource.findIndex((c) => c.id === customer.id);
          if (index !== -1) {
            this.dataSource = this.dataSource.filter(
              (c) => c.id !== customer.id,
            );
          }
        }
      });
  }

  onAddClick(): void {
    this.editingCustomer = null; // ensure create mode
    this.formShow = true;
  }
}
function inject(MatDialog: any) {
  throw new Error('Function not implemented.');
}
