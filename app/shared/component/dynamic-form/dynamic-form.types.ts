export type FieldType = "text" | "email" | "number" | "textarea" | "select";

export interface DynamicField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[]; // for select
  placeholder?: string;
}
