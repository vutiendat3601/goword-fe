import { notBlank } from '../../../utils/validator';

function validateName(name: string): string | null {
  return notBlank({ message: 'Bắt buộc.' }, name);
}

export { validateName };
