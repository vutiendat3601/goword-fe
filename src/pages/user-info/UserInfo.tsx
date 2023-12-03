import classNames from 'classnames/bind';
import styles from './UserInfo.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { FormField } from '../../utils/form-field';
import { Form, useActionData } from 'react-router-dom';
import Button from '../../components/button/Button';
import { hasNotNull } from '../../utils/validator';
import {
  validateFirstName,
  validateLastName,
} from '../auth/sign-up/sign-up-validator';
import { NotificationContext } from '../../context/NotificationContext';

const css = classNames.bind(styles);

function UserInfo() {
  const notifContextRef = useRef(useContext(NotificationContext));
  const [firstName, setFirstName] = useState<FormField>({
    value: '',
    message: null,
  });
  const [lastName, setLastName] = useState<FormField>({
    value: '',
    message: null,
  });
  const [valid, setValid] = useState<boolean>(true);
  const idRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailHiddenRef = useRef<HTMLInputElement>(null);
  const submitResp: any = useActionData();

  useEffect(() => {
    if (submitResp) {
      notifContextRef.current.addNotification({
        type: 'success',
        message: 'Cập nhật thông tin thành công',
      });
      setValid(false);
    }
  }, [submitResp]);
  useEffect(() => {
    const userInfoJSON: string | null = localStorage.getItem('userInfo');
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      if (userInfo) {
        setFirstName((firstName) => ({
          ...firstName,
          value: userInfo?.firstName,
        }));
        setLastName((lastName) => ({
          ...lastName,
          value: userInfo?.lastName,
        }));
        if (idRef.current) {
          idRef.current.value = userInfo?.id;
        }
        if (emailRef.current) {
          emailRef.current.value = userInfo?.email;
        }
        if (emailHiddenRef.current) {
          emailHiddenRef.current.value = userInfo?.email;
        }
      }
    }
  }, []);

  useEffect(() => {
    const valid = !hasNotNull(firstName.message, lastName.message);
    setValid(valid);
  }, [firstName, lastName]);

  return (
    <section className={css('user-info')}>
      <Form
        method="PUT"
        className={css('form')}
        onSubmit={valid ? undefined : (e: any) => e.preventDefault()}
      >
        <div className={css(`form-group`)}>
          <p className={`form-message`}>{}</p>
          <div className={css(`form-input`)}>
            <span className={css('form-title')}>ID</span>
            <input ref={idRef} disabled />
          </div>
        </div>
        <div className={css(`form-group`)}>
          <p className={`form-message`}>{firstName.message}</p>
          <div className={css(`form-input`)}>
            <span className={css('form-title')}>Tên</span>
            <input
              name="firstName"
              value={firstName.value}
              onChange={(e: any) => {
                const value = e.target.value;
                const firstNameMsg = validateFirstName(value);
                setFirstName({ value, message: firstNameMsg });
              }}
            />
          </div>
        </div>
        <div className={css(`form-group`)}>
          <p className={css(`form-message`)}>{lastName.message}</p>
          <div className={css(`form-input`)}>
            <span className={css('form-title')}>Họ</span>
            <input
              name="lastName"
              value={lastName.value}
              onChange={(e: any) => {
                const value = e.target.value;
                const lastNameMsg = validateLastName(value);
                setLastName({ value, message: lastNameMsg });
              }}
            />
          </div>
        </div>
        <div className={css(`form-group`)}>
          <p className={`form-message`}>{}</p>
          <div className={css(`form-input`)}>
            <span className={css('form-title')}>Email</span>
            <input ref={emailRef} disabled />
            <input ref={emailHiddenRef} name="email" hidden />
          </div>
        </div>
        <div className={css('submit-btn')}>
          <Button disabled={!valid} type={valid ? 'submit' : 'button'}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default UserInfo;
