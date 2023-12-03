import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import GlobalStyle from './components/global-style/GlobalStyle';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import NotificationContextProvider from './context/NotificationContext';
import UserContextProvider from './context/UserContextProvider';
import AuthLayout from './layouts/auth-layout/AuthLayout';
import DefaultLayout from './layouts/default-layout/DefaultLayout';
import PageContent from './layouts/default-layout/page-content/PageContent';
import EmailVerification from './pages/auth/email-verification/EmailVerification';
import SignIn from './pages/auth/sign-in/SignIn';
import SignUp from './pages/auth/sign-up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import Exercise from './pages/exercise/Exercise';
import NewExercise from './pages/exercise/new-exercise/NewExercise';
import GamePlay from './pages/game-play/GamePlay';
import Plan from './pages/plan/Plan';
import NewPlan from './pages/plan/new-plan/NewPlan';
import PlanDetail from './pages/plan/plan-detail/PlanDetail';
import Welcome from './pages/welcome/Welcome';
import { signIn, signUp, updateUser } from './services/auth-service';
import { createPlan, getPlan, getPlans } from './services/plan-service';
import { CREATE_EXERCISE, CREATE_PLAN } from './utils/permission';
import {
  createExercise,
  getExercise,
  getExercises,
} from './services/exercise-service';
import UserInfo from './pages/user-info/UserInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/',
    element: <ProtectedRoute component={<DefaultLayout />} />,
    children: [
      {
        path: 'dashboard',
        element: (
          <PageContent title="Dashboard" actions={[]}>
            <Dashboard />
          </PageContent>
        ),
      },
      {
        loader: getPlans,
        path: 'plan',
        element: (
          <PageContent actions={[CREATE_PLAN]} title="Kế hoạch">
            <Plan />
          </PageContent>
        ),
        children: [
          {
            path: 'new',
            action: createPlan,
            element: <NewPlan />,
          },
        ],
      },
      {
        path: '/plan/:planId',
        loader: getPlan,
        element: (
          <PageContent actions={[]} title="Kế hoạch">
            <PlanDetail />
          </PageContent>
        ),
      },
      {
        path: '/exercise',
        loader: getExercises,
        element: (
          <PageContent
            title="Bài tập"
            permission="MANAGE_EXERCISE"
            actions={[CREATE_EXERCISE]}
          >
            <Exercise />
          </PageContent>
        ),
      },
      {
        path: '/exercise/new',
        action: createExercise,
        element: (
          <PageContent
            title="Tạo bài tập"
            permission="MANAGE_EXERCISE"
            actions={[]}
          >
            <NewExercise />
          </PageContent>
        ),
      },
      {
        path: '/play',
        element: <ProtectedRoute component={<DefaultLayout />} />,
        children: [
          {
            loader: getExercise,
            path: ':exerciseId',
            element: (
              <PageContent title="" actions={[]}>
                <GamePlay />
              </PageContent>
            ),
          },
        ],
      },
      {
        path: '/user-management',
        element: <ProtectedRoute component={<DefaultLayout />} />,
        children: [
          {
            index: true,
            element: (
              <PageContent title="" actions={[]}>
                <h1>Coming soon...</h1>
              </PageContent>
            ),
          },
        ],
      },
      {
        // index: true,
        path: 'user',
        action: updateUser,
        element: (
          <PageContent title="Thông tin cá nhân" actions={[]}>
            <UserInfo />
          </PageContent>
        ),
      },
    ],
  },
  {
    path: '/auth/sign-in',
    action: signIn,
    element: (
      <AuthLayout title="Đăng nhập">
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: '/auth/sign-up',
    action: signUp,
    element: (
      <AuthLayout title="Đăng ký">
        <SignUp />
      </AuthLayout>
    ),
  },
  {
    path: '/auth/email-verification',
    element: (
      <AuthLayout title="Xác thực email">
        <EmailVerification />
      </AuthLayout>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <GlobalStyle>
    <NotificationContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </NotificationContextProvider>
  </GlobalStyle>
  // {/* </React.StrictMode> */}
);
