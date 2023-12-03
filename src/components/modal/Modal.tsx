import classNames from 'classnames/bind';
import styles from './Modal.module.css';
const css = classNames.bind(styles);

interface ModalProps {
  title: string;
  children: any;
}
function Modal({ title, children }: ModalProps) {
  return (
    <div className={css('wrapper')}>
      <div className={css('inner')}>
        <header className={css('header')}>
          <h2>{title}</h2>
        </header>
        <div className={css('body')}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
