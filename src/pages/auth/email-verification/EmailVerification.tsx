import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import toastIconError from '../../../assets/img/toast--error.svg';
import toastIconSuccess from '../../../assets/img/toast--success.svg';
import Spinner from '../../../components/spinner/Spinner';
import styles from './EmailVerification.module.css';

import { Link, useLocation } from 'react-router-dom';
import { verifyEmail } from '../../../services/auth-service';
import messageVi from '../../../assets/message.vi.json';

const css = classNames.bind(styles);

function EmailVerification() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading'
  );
  const [message, setMessage] = useState<string>(
    'Xác thực email thất bại, vui lòng đăng nhập để nhận lại mã xác thực mới.'
  );

  const location = useLocation();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      const code = new URLSearchParams(location.search).get('code') as string;
      if (code) {
        const resp = await verifyEmail(code);
        if (resp.status === 'error') {
          setStatus('error');
          switch (resp.code) {
            case 'E404':
              setMessage('Mã xác thực email không tồn tại.');
              break;
            default:
              setMessage(messageVi[resp.code as keyof object]);
          }
        } else if (resp.status === 'success') {
          setStatus('success');
          setMessage('Email đã được xác thực thành công.');
        }
      }
    };
    handleVerifyEmail();
  }, [location]);

  return status === 'loading' ? (
    <Spinner />
  ) : (
    <div className={css('wrapper')}>
      <div className={css('message', { error: status === 'error' })}>
        <img
          src={status === 'success' ? toastIconSuccess : toastIconError}
          alt={status}
        />
        <p className={css('message-content')}>{message}</p>
      </div>
      <div className={css('cta')}>
        <Link className="btn" to="/auth/sign-in">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default EmailVerification;
