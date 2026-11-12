export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

export type CustomerPayload = Omit<Customer, "id">;
export type CustomerFormMode = "create" | "edit";
