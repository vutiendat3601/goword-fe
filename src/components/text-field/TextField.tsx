import classNames from 'classnames/bind';
import { HTMLInputTypeAttribute, useRef } from 'react';
import eyeOffIcon from '../../assets/img/eye-off.svg';
import eyeIcon from '../../assets/img/eye.svg';
import styles from './TextField.module.css';

const css = classNames.bind(styles);

interface TextFieldProps {
  className?: string;
  name?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | 'textarea';
  value?: string;
  cols?: number;
  rows?: number;
  onChange?: (e: any) => void;
}

function TextField({
  placeholder,
  type = 'text',
  value,
  name,
  cols,
  rows,
  onChange,
}: TextFieldProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const passwordToggleIconRef = useRef<HTMLImageElement>(null);

  const handlePasswordToggle = (e: any) => {
    const input = inputRef.current;
    const passwordToggleIcon = passwordToggleIconRef.current;
    if (input && passwordToggleIcon) {
      switch (input.type) {
        case 'password':
          input.type = 'text';
          passwordToggleIcon.src = eyeOffIcon;
          break;
        default:
          input.type = 'password';
          passwordToggleIcon.src = eyeIcon;
          break;
      }
    }
  };

  const handleOnChange = (e: any) => onChange && onChange(e.target.value);

  return (
    <div
      className={css('text-field', {
        'text-field--textarea': type === 'textarea',
      })}
    >
      <p
        className={`${css('label', {
          'label--shown': value,
          'label--textarea': type === 'textarea',
        })}`}
      >
        {placeholder}
      </p>
      {type === 'textarea' ? (
        <textarea
          name={name}
          className={`${css('textarea')}`}
          value={value}
          cols={cols}
          rows={rows}
          placeholder={placeholder}
          onChange={handleOnChange}
        />
      ) : (
        <input
          ref={inputRef}
          className={css('input')}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleOnChange}
        />
      )}
      {type === 'password' && (
        <button
          type="button"
          className={css('password-toggle')}
          onClick={handlePasswordToggle}
        >
          <img
            ref={passwordToggleIconRef}
            src={eyeIcon}
            alt=""
            className="password-eye-icon"
          />
        </button>
      )}
    </div>
  );
}

export default TextField;
