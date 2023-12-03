import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import bookOpenIcon from '../../../assets/img/book-open-icon.svg';
import folderIcon from '../../../assets/img/folder-icon.svg';
import homeIcon from '../../../assets/img/home-icon.svg';
import usersIcon from '../../../assets/img/users-icon.svg';
import styles from './SideBar.module.css';
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';

const css = classNames.bind(styles);

function SideBar() {
  const location = useLocation();
  const {
    userInfo: { permissions },
  } = useContext(UserContext);
  return (
    <aside className={css('wrapper')}>
      <ul className={css('nav-list')}>
        <li
          className={css('nav-item', {
            active: location.pathname.startsWith('/dashboard'),
          })}
        >
          <Link className={css('nav-link')} to={'/dashboard'}>
            <img src={homeIcon} alt="" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li
          className={css('nav-item', {
            active: location.pathname.startsWith('/plan'),
          })}
        >
          <Link className={css('nav-link')} to={'/plan'}>
            <img src={folderIcon} alt="" />
            <span>Kế hoạch</span>
          </Link>
        </li>
        {permissions.includes('MANAGE_EXERCISE') && (
          <li
            className={css('nav-item', {
              active: location.pathname.startsWith('/exercise'),
            })}
          >
            <Link className={css('nav-link')} to={'/exercise'}>
              <img src={bookOpenIcon} alt="" />
              <span>Bài tập</span>
            </Link>
          </li>
        )}
        {permissions.includes('MANAGE_USER') && (
          <li
            className={css('nav-item', {
              active: location.pathname.startsWith('/user-management'),
            })}
          >
            <Link className={css('nav-link')} to={'/user-management'}>
              <img src={usersIcon} alt="" />
              <span>Người dùng</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default SideBar;
