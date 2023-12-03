import { createContext } from 'react';

interface FormContextProps {
  onSubmit?: () => (e: any) => void;
  setOnSubmit?: (e: any) => void;
}

const defaultFormContext: FormContextProps = {
  onSubmit: undefined,
  setOnSubmit: undefined,
};

const FormContext: React.Context<FormContextProps> =
  createContext(defaultFormContext);

export { defaultFormContext };
export type { FormContextProps };
export default FormContext;
