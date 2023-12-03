import { matchPattern, notBlank } from '../../../utils/validator';

function validateEmail(email: string): string | null {
  return (
    notBlank({ message: 'Bắt buộc.' }, email) ||
    matchPattern(
      {
        message: 'Sai định dạng email.',
        regex: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
      },
      email
    )
  );
}

function validatePassword(password: string): string | null {
  return notBlank({ message: 'Bắt buộc.' }, password);
}

export { validateEmail, validatePassword };
