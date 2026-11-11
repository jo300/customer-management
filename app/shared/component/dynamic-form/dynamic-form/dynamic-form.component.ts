import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { DynamicField } from "../dynamic-form.types";

@Component({
  selector: "app-dynamic-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./dynamic-form.component.html",
  styleUrl: "./dynamic-form.component.scss",
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) fields: DynamicField[] = [];
  @Input() submitLabel = "Submit";

  @Output() submitForm = new EventEmitter<Record<string, unknown>>();
  @Output() cancelForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const controls: Record<string, unknown> = {};
    for (const f of this.fields) {
      const validators = [];
      if (f.required) validators.push(Validators.required);
      if (f.email) validators.push(Validators.email);
      if (f.type === "number")
        validators.push(
          Validators.min(f.min ?? -Infinity),
          Validators.max(f.max ?? Infinity),
        );
      controls[f.key] = ["", validators];
    }
    this.form = this.fb.group(controls);
  }

  control(key: string) {
    return this.form.get(key)!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue());
  }
}
