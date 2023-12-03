import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useActionData } from 'react-router-dom';
import messageVi from '../../../assets/message.vi.json';
import Button from '../../../components/button/Button';
import TextField from '../../../components/text-field/TextField';
import FormContext from '../../../context/FormContext';
import { NotificationContext } from '../../../context/NotificationContext';
import UserContext from '../../../context/UserContext';
import { generateTokenByRefreshToken } from '../../../services/auth-service';
import { FormField, emptyFormField } from '../../../utils/form-field';
import { hasNotNull } from '../../../utils/validator';
import styles from './SignIn.module.css';
import { validateEmail, validatePassword } from './sign-in-validator';

const css = classNames.bind(styles);

function SignIn() {
  const [email, setEmail] = useState<FormField>(emptyFormField);
  const [password, setPassword] = useState<FormField>(emptyFormField);
  const [valid, setValid] = useState<boolean>(false);

  // ## FormContext
  const { setOnSubmit } = useContext(FormContext);

  const submitResp: any = useActionData();

  const notifContextRef = useRef(useContext(NotificationContext));
  const { authenticated, setUserInfo, setAuthenticated } =
    useContext(UserContext);

  // ## handle form onSubmit
  useEffect(() => {
    const valid = !hasNotNull(email.message, password.message);
    if (setOnSubmit) {
      setOnSubmit(valid ? undefined : () => (e: any) => e?.preventDefault());
    }
    setValid(valid);
  }, [email, password, setOnSubmit]);

  useEffect(() => {
    if (submitResp?.error?.code) {
      notifContextRef.current.addNotification({
        type: 'error',
        message: messageVi[submitResp?.error?.code as keyof object],
      });
      setValid(false);
    }
  }, [submitResp]);

  // ## UserContext
  useEffect(() => {
    async function checkAuthData() {
      const userInfo = await generateTokenByRefreshToken();
      if (userInfo && setUserInfo && setAuthenticated) {
        setUserInfo(userInfo);
        setAuthenticated(true);
      }
    }
    checkAuthData();
  }, [setAuthenticated, setUserInfo, submitResp]);

  return authenticated ? (
    <Navigate to={'/dashboard'} />
  ) : (
    <>
      <div className={`form-group`}>
        <p className={`form-message`}>{email.message}</p>
        <div className={`form-input`}>
          <TextField
            name="email"
            placeholder="Email *"
            value={email.value}
            onChange={(value: string) => {
              const emailMsg = validateEmail(value);
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
      <div className={css('action')}>
        <Link className={css('action-link')} to={'/auth/sign-up'}>
          Chưa có tài khoản?
        </Link>
        <Link className={`${css('action-link')}`} to={'#!'}>
          Quên mật khẩu?
        </Link>
      </div>
      <div className={css('submit-btn')}>
        <Button disabled={!valid} type={valid ? 'submit' : 'button'}>
          Đăng nhập
        </Button>
      </div>
    </>
  );
}

export default SignIn;
