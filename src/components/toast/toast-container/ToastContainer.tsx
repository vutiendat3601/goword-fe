import classNames from 'classnames/bind';
import styles from './ToastContainer.module.css';

const css = classNames.bind(styles);
interface ToastContainerProps {
  children?: any;
}
function ToastContainer({ children }: ToastContainerProps): JSX.Element {
  return <aside className={css('toast-container')}>{children}</aside>;
}

export default ToastContainer;
