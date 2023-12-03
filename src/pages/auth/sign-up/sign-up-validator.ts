import { length, matchPattern, notBlank } from '../../../utils/validator';

function validateFirstName(firstName: string): string | null {
  return (
    notBlank({ message: 'Bắt buộc.' }, firstName) ||
    length({ min: 0, max: 16, message: 'Tên tối đa 16 ký tự.' }, firstName)
  );
}
function validateLastName(lastName: string): string | null {
  return length(
    { min: -1, max: 32, message: 'Tên tối đa 32 ký tự.' },
    lastName
  );
}
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
  return (
    notBlank({ message: 'Bắt buộc.' }, password) ||
    length(
      {
        min: 6,
        max: 32,
        message: 'Mật khẩu có độ dài trong khoảng 6-32 ký tự.',
      },
      password
    ) ||
    matchPattern(
      {
        message: 'Mật khẩu chứa ký tự in hoa, in thường và số.',
        regex: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+',
      },
      password
    )
  );
}

export { validateEmail, validateFirstName, validateLastName, validatePassword };
