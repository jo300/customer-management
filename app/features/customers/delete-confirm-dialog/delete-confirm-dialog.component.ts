import { Component } from '@angular/core';

import { Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
export interface DeleteConfirmData {
  customerName: string;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Delete customer?</h2>
    <mat-dialog-content>
      Are you sure you want to delete <strong>{{ data.customerName }}</strong
      >? This action cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: DeleteConfirmData,
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
