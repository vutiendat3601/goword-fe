interface FormField {
  value: string;
  message: string | null;
}

const emptyFormField: FormField = {
  value: '',
  message: '',
};

export type { FormField };
export { emptyFormField };
