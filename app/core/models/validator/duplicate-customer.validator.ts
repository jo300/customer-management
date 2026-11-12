import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Customer } from "../../models/customer.model";

/**
 *
 * @param existingCustomers - the current customers to check against
 * @param currentCustomerId - when editing, exclude this customer's own id
 *                            (so editing a customer doesn't flag itself)
 */
export function duplicateEmailValidator(
  existingCustomers: Customer[],
  currentCustomerId?: number,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string | null)?.trim().toLowerCase();
    if (!value) {
      return null;
    }

    const duplicate = existingCustomers.some(
      (c) => c.email.toLowerCase() === value && c.id !== currentCustomerId, // ignore self when editing
    );

    return duplicate ? { duplicateEmail: true } : null;
  };
}
