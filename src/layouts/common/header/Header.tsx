import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoSmall from '../../../assets/img/logo--small.svg';
import menuIconBlack from '../../../assets/img/menu-icon--black.svg';
import Button from '../../../components/button/Button';
import UserContext from '../../../context/UserContext';
import styles from './Header.module.css';
import { signOut } from '../../../services/auth-service';

const css = classNames.bind(styles);

interface HeaderProps {
  variant: 'dashboard' | 'landing';
}

function Header({ variant = 'landing' }: HeaderProps) {
  const [userMenuHidden, setUserMenuHidden] = useState<boolean>(true);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  return (
    <header
      className={css(`header`, {
        [`${variant}`]: true,
      })}
    >
      <div className={`${css('header-content')}`}>
        <Link to={variant === 'landing' ? '/' : '/dashboard'}>
          <img className={css('header__logo')} src={logoSmall} alt="Go Word" />
        </Link>
        {variant === 'landing' ? (
          <div className={css('action-box')}>
            <Link to="/auth/sign-in" className={css('sign-in-link')}>
              Đăng nhập
            </Link>
            <div className={css('sign-up-btn')}>
              <Button type="button" onClick={(e) => navigate('/auth/sign-up')}>
                Đăng ký
              </Button>
            </div>
          </div>
        ) : (
          <div className={css('user', { [`${variant}`]: true })}>
            <p className={css('username')}>
              {`${userContext.userInfo.firstName} ${userContext.userInfo.lastName}`}
            </p>
            <button
              type="button"
              className={css('menu-btn')}
              onClick={() => setUserMenuHidden((hidden) => !hidden)}
            >
              <img src={menuIconBlack} alt="" className="menu" />
            </button>
            <ul className={css('user-menu', { showed: !userMenuHidden })}>
              <li className={css('menu-item')}>
                <Link to={'/user'}>Thông tin cá nhân</Link>
              </li>
              <li className={css('menu-item')} onClick={() => signOut()}>
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
