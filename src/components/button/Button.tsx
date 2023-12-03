import classNames from 'classnames/bind';
import styles from './Button.module.css';

const css = classNames.bind(styles);

interface ButtonProps {
  children: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: (e: any) => void;
}

function Button({
  disabled = false,
  children,
  type = 'submit',
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${css({
        'btn--disabled': disabled,
      })} btn`}
      type={type}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}

export default Button;
