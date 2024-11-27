import MyProfile from '../pages/account/MyProfile';
import SignIn from '../pages/account/SignIn';
import SignUp from '../pages/account/SignUp';
import FindPassword from '../pages/account/FindPassword';
import FindEmail from '../pages/account/FindEmail';
import ResetPassword from '../pages/account/ResetPassword';
import ProtectedRouter from '@/pages/ProtectedRouter';

export const accountRouter = [
  {
    path: 'my-profile',
    element: (
      <ProtectedRouter>
        <MyProfile />
      </ProtectedRouter>
    ),
  },
  { path: 'sign-in', element: <SignIn /> },
  { path: 'sign-up', element: <SignUp /> },
  {
    path: 'find-password',
    element: (
      <ProtectedRouter>
        <FindPassword />
      </ProtectedRouter>
    ),
  },
  {
    path: 'account/find-email',
    element: (
      <ProtectedRouter>
        <FindEmail />
      </ProtectedRouter>
    ),
  },
  {
    path: 'account/reset-password',
    element: (
      <ProtectedRouter>
        <ResetPassword />
      </ProtectedRouter>
    ),
  },
];
