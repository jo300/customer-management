import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Customer } from "../models/customer.model";

export function duplicateEmailValidator(
  existingCustomers: Customer[],
  currentCustomerId?: number,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = (control.value as string)?.trim().toLowerCase();
    if (!email) return null; // Let the 'required' validator handle empty values

    // Check if the email exists in the list, but ignore the current customer being edited
    const isDuplicate = existingCustomers.some(
      (c) => c.email.toLowerCase() === email && c.id !== currentCustomerId,
    );

    return isDuplicate ? { duplicateEmail: true } : null;
  };
}
