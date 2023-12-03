import classNames from 'classnames/bind';
import styles from './Spinner.module.css';

const css = classNames.bind(styles);

function Spinner(): JSX.Element {
  return (
    <div className={css('wrapper')}>
      <div className={css('spinner')}></div>
    </div>
  );
}

export default Spinner;
