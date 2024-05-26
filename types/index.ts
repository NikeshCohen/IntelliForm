export interface FormField {
  fieldName: string;
  placeholder: string | null;
  type: string;
  input: string; // 'input', 'textarea', 'checkbox', 'select', etc.
  label: string;
  options?: Array<{ value: string; label: string }>; // Optional for select fields
}

export interface JsonForm {
  formId: string;
  formTitle: string;
  formSubheading: string;
  formFields: FormField[];
}

export interface Table {
  [x: string]: any;
  id: number;
  formId: string;
  jsonForm: string;
  createdBy: string;
  createdAt: string;
}
