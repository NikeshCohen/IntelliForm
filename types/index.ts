export interface FormField {
  fieldName: string;
  placeholder: string | null;
  type: string;
  inputType: string; // 'input', 'textarea', 'checkbox', 'select', etc.
  label: string;
  options?: Array<{ value: string; label: string }>; // Optional for select fields
}

export interface JsonForm {
  formTitle: string;
  formSubheading: string;
  formFields: FormField[];
}
