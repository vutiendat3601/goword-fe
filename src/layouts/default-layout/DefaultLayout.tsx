import { Outlet } from 'react-router-dom';
import Header from '../common/header/Header';
import SideBar from './sidebar/SideBar';
import styles from './DefaultLayout.module.css';
import classNames from 'classnames/bind';

const css = classNames.bind(styles);

function DefaultLayout() {
  return (
    <div className={css('wrapper')}>
      <Header variant="dashboard" />
      <SideBar />
      <main className="app">
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
