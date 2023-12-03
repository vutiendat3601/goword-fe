import { redirect } from 'react-router-dom';
import { parseError } from '../utils/api-util';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function generateTokenByRefreshToken() {
  // # Request
  const API_AUTH_TOKEN = `${API_BASE_URL}/auth/token`;

  const reqOptions: RequestInit = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refToken')}`,
    },
  };

  // # Response
  const resp = await fetch(API_AUTH_TOKEN, reqOptions);
  if (resp.ok) {
    const authResp = await resp.json();
    const authData = authResp.data;
    localStorage.setItem('refToken', authData.refreshToken);
    localStorage.setItem('accToken', authData.accessToken);
    return authData.userInfo;
  }
  return null;
}

async function signIn({ request }: { request: any }) {
  // # Request
  const API_AUTH_TOKEN = `${API_BASE_URL}/auth/token`;
  const formData = await request.formData();
  const signInReq = Object.fromEntries(formData);

  const reqOptions: RequestInit = {
    method: 'post',
    headers: {
      Authorization: `Basic ${btoa(
        `${signInReq.email}:${signInReq.password}`
      )}`,
    },
  };

  // # Response
  const resp = await fetch(API_AUTH_TOKEN, reqOptions);
  if (resp.ok) {
    const authResp = await resp.json();
    const authData = authResp.data;
    localStorage.setItem('refToken', authData.refreshToken);
    localStorage.setItem('accToken', authData.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(authData.userInfo));
    localStorage.setItem('sessionId', authData.sessionId);
    return null;
  }

  const err = await parseError(resp);
  err.formData = signInReq;
  return err;
}

async function signOut() {
  // # Request
  const API_AUTH_SIGN_OUT = `${API_BASE_URL}/auth/sign-out?sessionId=${localStorage.getItem(
    'sessionId'
  )}`;

  const Authorization = localStorage.getItem('accToken');
  const reqOptions: RequestInit = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${Authorization}`,
    },
  };

  // # Response
  fetch(API_AUTH_SIGN_OUT, reqOptions);
  localStorage.clear();
  window.location.href = '/auth/sign-in';
}

async function signUp({ request }: { request: any }) {
  const API_AUTH_SIGN_UP = `${API_BASE_URL}/auth/sign-up`;

  // # Request
  const formData = await request.formData();
  const signUpReq = Object.fromEntries(formData);
  const reqOptions: RequestInit = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpReq),
  };

  // # Response
  const resp = await fetch(API_AUTH_SIGN_UP, reqOptions);
  if (resp.ok) {
    localStorage.clear();
    return redirect('/auth/sign-in');
  }

  const err = await parseError(resp);
  err.formData = signUpReq;
  return err;
}

async function updateUser({ request }: { request: any }) {
  const API_AUTH_SIGN_UP = `${API_BASE_URL}/auth`;

  // # Request
  const formData = await request.formData();
  const userReq = Object.fromEntries(formData);
  const reqOptions: RequestInit = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accToken')}`,
    },
    body: JSON.stringify(userReq),
  };

  // # Response
  const resp = await fetch(API_AUTH_SIGN_UP, reqOptions);
  if (resp.ok) {
    return { status: 'success', timestamp: new Date().toUTCString() };
  }

  const err = await parseError(resp);
  err.formData = userReq;
  return err;
}

async function verifyEmail(code: string) {
  const API_AUTH_EMAIL_VERIFICATION = `${API_BASE_URL}/auth/email-verification`;

  // # Request
  const urlencoded = new URLSearchParams();
  urlencoded.append('code', code);
  const reqOptions: RequestInit = {
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  };

  // # Response
  const resp = await fetch(API_AUTH_EMAIL_VERIFICATION, reqOptions);
  return resp.json();
}

export {
  signIn,
  signOut,
  signUp,
  generateTokenByRefreshToken,
  verifyEmail,
  updateUser,
};
