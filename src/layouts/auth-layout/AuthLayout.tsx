import classNames from 'classnames/bind';
import { Form } from 'react-router-dom';
import keyboardIconBlack from '../../assets/img/keyboard-icon--black.svg';
import logoMedium from '../../assets/img/logo--medium.svg';
import styles from './AuthLayout.module.css';
import { useState } from 'react';
import FormContext from '../../context/FormContext';

const css = classNames.bind(styles);

interface AuthLayoutProps {
  title: string;
  children: any;
}

function AuthLayout({ children, title }: AuthLayoutProps) {
  const [onSubmit, setOnSubmit] = useState<
    (() => (e: any) => void) | undefined
  >(undefined);
  return (
    <div className={css('wrapper')}>
      <div className={css('background')}></div>
      <div className={css('form-wrapper')}>
        <Form method="post" className={css('form')} onSubmit={onSubmit}>
          {/* Header */}
          <header>
            <div className={css('image-box')}>
              <img src={keyboardIconBlack} alt="" />
              <img className={css('logo')} src={logoMedium} alt="" />
            </div>
            <h1 className={css('heading')}>{title}</h1>
          </header>
          {/* Body */}
          <section className={css('body')}>
            <FormContext.Provider value={{ onSubmit, setOnSubmit }}>
              {children}
            </FormContext.Provider>
          </section>
        </Form>
      </div>
    </div>
  );
}

export default AuthLayout;
