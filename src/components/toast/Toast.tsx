import toastIconError from '../../assets/img/toast--error.svg';
import toastIconInfo from '../../assets/img/toast--info.svg';
import toastIconSuccess from '../../assets/img/toast--success.svg';
import toastIconWarning from '../../assets/img/toast--warning.svg';
import { ReactComponent as ToastIconClose } from '../../assets/img/toast__close-icon.svg';

import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  index: number;
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string | null;
  timeout?: number;
  onRemove?: (id: number) => void;
}

function Toast({
  index,
  type = 'success',
  message,
  timeout = 3,
  onRemove,
}: ToastProps): JSX.Element {
  useEffect(() => {
    if (timeout > 0) {
      const timeoutId = setTimeout(
        () => onRemove && onRemove(index),
        timeout * 1000
      ); // Delay for 3 seconds

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeout, index, onRemove]);

  let toastIcon = toastIconSuccess;
  let cssType = 'toast--success';
  switch (type) {
    case 'error':
      toastIcon = toastIconError;
      cssType = 'toast--error';
      break;
    case 'info':
      toastIcon = toastIconInfo;
      cssType = 'toast--info';
      break;
    case 'warning':
      toastIcon = toastIconWarning;
      cssType = 'toast--warning';
      break;
  }
  return (
    <div className={`toast ${cssType}`}>
      <img src={toastIcon} alt="" className="toast__icon" />
      <p className="toast__message">{message}</p>
      <button
        className="toast__close-btn"
        onClick={(e: any) => onRemove && onRemove(index)}
      >
        <ToastIconClose className="toast__close-icon" />
      </button>
    </div>
  );
}

export default Toast;
