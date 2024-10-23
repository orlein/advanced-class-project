import MyProfile from '../pages/account/MyProfile';
import SignIn from '../pages/account/SignIn';
import SignUp from '../pages/account/SignUp';
import FindPassword from '../pages/account/FindPassword';
import FindEmail from '../pages/account/FindEmail';
import ResetPassword from '../pages/account/ResetPassword';

export const accountRouter = [
  { path: 'my-profile', element: <MyProfile /> },
  { path: 'sign-in', element: <SignIn /> },
  { path: 'sign-up', element: <SignUp /> },
  { path: 'find-password', element: <FindPassword /> },
  { path: 'account/find-email', element: <FindEmail /> },
  { path: 'account/reset-password', element: <ResetPassword /> },
];
