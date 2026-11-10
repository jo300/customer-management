export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

export type CustomerPayload = Omit<Customer, 'id'>;

/**
 * Form mode — determines whether the form creates or edits a customer.
 */
export type CustomerFormMode = 'create' | 'edit';
