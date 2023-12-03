import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useActionData } from 'react-router-dom';
import messageVi from '../../../assets/message.vi.json';
import Button from '../../../components/button/Button';
import TextField from '../../../components/text-field/TextField';
import { NotificationContext } from '../../../context/NotificationContext';
import styles from './SignUp.module.css';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from './sign-up-validator';
import { FormField, emptyFormField } from '../../../utils/form-field';
import FormContext from '../../../context/FormContext';
import { hasNotNull } from '../../../utils/validator';
const css = classNames.bind(styles);

function SignUp() {
  const [firstName, setFirstName] = useState<FormField>(emptyFormField);
  const [lastName, setLastName] = useState<FormField>(emptyFormField);
  const [email, setEmail] = useState<FormField>(emptyFormField);
  const [password, setPassword] = useState<FormField>(emptyFormField);

  const [valid, setValid] = useState<boolean>(false);

  // ## FormContext
  const { setOnSubmit } = useContext(FormContext);

  // ## handle form onSubmit
  useEffect(() => {
    const valid = !hasNotNull(
      firstName.message,
      lastName.message,
      email.message,
      password.message
    );
    setValid(valid);
    if (setOnSubmit) {
      setOnSubmit(valid ? undefined : () => (e: any) => e?.preventDefault());
    }
  }, [email, password, firstName, lastName, setOnSubmit]);

  const notifContextRef = useRef(useContext(NotificationContext));
  const submitErr: any = useActionData();

  useEffect(() => {
    if (submitErr?.error?.code) {
      notifContextRef.current.addNotification({
        type: 'error',
        message: messageVi[submitErr?.error?.code as keyof object],
      });
      if (submitErr?.error?.code === 'E40901') {
        setEmail((email) => ({ ...email, message: 'Email đã được đăng ký' }));
      }
    }
  }, [submitErr]);

  return (
    <>
      <div className={`form-group`}>
        <p className={`form-message`}>{firstName.message}</p>
        <div className={`form-input`}>
          <TextField
            name="firstName"
            placeholder="Tên *"
            value={firstName.value}
            onChange={(value: string) => {
              const firstNameMsg = validateFirstName(value);
              setFirstName({ value, message: firstNameMsg });
            }}
          />
        </div>
      </div>
      <div className={`form-group`}>
        <p className={`form-message`}>{lastName.message}</p>
        <div className={`form-input`}>
          <TextField
            name="lastName"
            placeholder="Họ và tên đệm"
            value={lastName.value}
            onChange={(value: string) => {
              const lastNameMsg = validateLastName(value);
              setLastName((lastName) => ({ value, message: lastNameMsg }));
            }}
          />
        </div>
      </div>
      <div className={`form-group`}>
        <p className={`form-message`}>{email.message}</p>
        <div className={`form-input`}>
          <TextField
            type="email"
            name="email"
            placeholder="Email *"
            value={email.value}
            onChange={(value: string) => {
              let emailMsg = validateEmail(value);
              if (!emailMsg && submitErr?.error?.code === 'E40901') {
                emailMsg =
                  submitErr.formData?.email === value
                    ? 'Email đã được đăng ký.'
                    : null;
              }
              setEmail({ value, message: emailMsg });
            }}
          />
        </div>
      </div>
      <div className={`form-group`}>
        <p className={`form-message`}>{password.message}</p>
        <div className={`form-input`}>
          <TextField
            name="password"
            type="password"
            placeholder="Mật khẩu *"
            value={password.value}
            onChange={(value: string) => {
              const passwordMsg = validatePassword(value);
              setPassword({ value, message: passwordMsg });
            }}
          />
        </div>
      </div>
      <Link className={`${css('sign-in-link')}`} to={'/auth/sign-in'}>
        Đã có tài khoản?
      </Link>
      <p className={css('policy')}>
        Bằng cách nhấn <span className="text-highlight">Đăng ký</span>, bạn đồng
        ý với{' '}
        <a href="#!" className="text-highlight">
          Điều khoản và Chính sách quyền riêng tư
        </a>{' '}
        của chúng tôi.
      </p>
      <div className={css('submit-btn')}>
        <Button disabled={!valid} type={valid ? 'submit' : 'button'}>
          Đăng ký
        </Button>
      </div>
    </>
  );
}

export default SignUp;
