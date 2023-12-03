import classNames from 'classnames/bind';
import styles from './PageContent.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';
import Spinner from '../../../components/spinner/Spinner';

const css = classNames.bind(styles);

interface PageContentProps {
  title: string;
  permission?: string;
  actions: {
    permission: string;
    url: string;
    styledButton: boolean;
    label: string;
  }[];
  children?: any;
}

function PageContent({
  title,
  actions,
  children,
  permission,
}: PageContentProps): JSX.Element {
  const {
    userInfo: { permissions },
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean>(false);
  useEffect(() => {
    if (permission && !permissions.includes(permission)) {
      navigate(`/dashboard`);
    }
    setAuthorized(true);
  }, [navigate, permissions, permission]);

  return authorized ? (
    <div className={`${css('wrapper')}`}>
      <div className={`content`}>
        <div className={`modal`}>
          <Outlet />
        </div>
        <header className={css('header')}>
          <div className={css('header-content')}>
            <h1>{title}</h1>
            <div className={css('action-wrapper')}>
              {actions.map((action, index) => {
                let comp = null;
                if (permissions.includes(action.permission)) {
                  comp = action.styledButton ? (
                    <Link key={index} className="btn" to="new">
                      {action.label}
                    </Link>
                  ) : (
                    <button key={index}>{action.label}</button>
                  );
                }
                return comp;
              })}
            </div>
          </div>
        </header>
        <div className={css('page-content')}>{children}</div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

export default PageContent;
