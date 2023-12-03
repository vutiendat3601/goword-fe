import Header from '../../layouts/common/header/Header';
import logoMedium from '../../assets/img/logo--medium.svg';
import keyboardIcon from '../../assets/img/keyboard-icon.svg';
import bookIcon from '../../assets/img/book-icon.svg';
import styles from './Welcome.module.css';
import classNames from 'classnames/bind';

const css = classNames.bind(styles);

function Welcome() {
  return (
    <div>
      <Header variant="landing" />
      <main>
        <section className={css('hero')}>
          <div className={css('content')}>
            <img className={css('book-image')} src={bookIcon} alt="" />
            <div className={css('info')}>
              <img src={keyboardIcon} alt="" className={css('keyboard-icon')} />
              <img src={logoMedium} alt="" className={css('logo')} />
              <p className={css('slogan')}>
                Đồng hành với bạn trong mọi từ ngữ.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Welcome;
