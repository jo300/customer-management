import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  Inject,
  Optional,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import {
  Customer,
  CustomerFormMode,
  CustomerPayload,
} from "../../../core/models/customer.model";
import { PhoneFormatDirective } from "../../../shared/directives/phone-format.directive";
import { duplicateEmailValidator } from "../../../core/validator/duplicate-email.validator";
@Component({
  selector: "app-customer-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    PhoneFormatDirective,
  ],
  templateUrl: "./customer-form.component.html",
  styleUrl: "./customer-form.component.scss",
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() mode: CustomerFormMode = "create";
  @Input() customer?: Customer;
  @Input() existingCustomers: Customer[] = [];

  @Output() formSubmit = new EventEmitter<CustomerPayload>();
  @Output() formCancel = new EventEmitter<void>();

  readonly form: FormGroup = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: [""],
    company: [""],
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) {}

  ngOnInit(): void {
    // 1. If opened as a Dialog, read the data passed by the List component
    if (this.dialogData) {
      this.mode = this.dialogData.mode;
      this.customer = this.dialogData.customer;
      this.existingCustomers = this.dialogData.existingCustomers || [];
    }

    // 2. Pre-fill the form when editing
    if (this.mode === "edit" && this.customer) {
      this.form.patchValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
        phone: this.customer.phone ?? "",
        company: this.customer.company ?? "",
      });
    }

    // 3. Wire up the duplicate email validator
    const emailControl = this.form.get("email");
    emailControl?.addValidators(
      duplicateEmailValidator(
        this.existingCustomers,
        this.mode === "edit" ? this.customer?.id : undefined,
      ),
    );
    emailControl?.updateValueAndValidity();
  }

  get firstName() {
    return this.form.get("firstName")!;
  }

  get lastName() {
    return this.form.get("lastName")!;
  }

  get email() {
    return this.form.get("email")!;
  }

  get phone() {
    return this.form.get("phone")!;
  }

  get company() {
    return this.form.get("company")!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload: CustomerPayload = {
      firstName: (raw.firstName as string).trim(),
      lastName: (raw.lastName as string).trim(),
      email: (raw.email as string).trim().toLowerCase(),
      phone: (raw.phone as string)?.trim() || undefined,
      company: (raw.company as string)?.trim() || undefined,
    };

    if (this.dialogRef) {
      this.dialogRef.close(payload);
    } else {
      this.formSubmit.emit(payload);
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.formCancel.emit();
    }
  }
}
