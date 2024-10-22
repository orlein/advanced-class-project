import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home.tsx';
import SignIn from './pages/account/SignIn.tsx';
import SignUp from './pages/account/SignUp.tsx';
import ChallengeMain from './pages/challenges/ChallengeMain.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import MyProfile from './pages/MyProfile.tsx';
import AllChallenges from './pages/challenges/AllChallenges.tsx';
import SuccessUsers from './pages/challenges/SuccessUsers.tsx';
import TopChallenges from './pages/challenges/TopChallenges.tsx';
import NewChallenges from './pages/challenges/NewChallenges.tsx';
import FindEmail from './pages/account/FindEmail.tsx';
import ResetPassword from './pages/account/ResetPassword.tsx';
import NotificationSetting from './pages/settings/NotificationSetting.tsx';
import ThemeSetting from './pages/settings/ThemeSetting.tsx';
import CustomizationSetting from './pages/settings/CustomizationSetting.tsx';
import CookieSetting from './pages/settings/CookieSetting.tsx';
import BlockUsersSetting from './pages/settings/BlockUsersSetting.tsx';
import PrivateAccountSetting from './pages/settings/PrivateAccountSetting.tsx';
import FindPassword from './pages/account/FindPassword.tsx';
import ChallengeDetail from './pages/challenges/individualChallenge/ChallengeDetail.tsx';
import ChallengeDetailDescription from './pages/challenges/individualChallenge/ChallengeDetailDescription.tsx';
import JoinChallenge from './pages/challenges/individualChallenge/JoinChallenge.tsx';
import EditChallenge from './pages/challenges/individualChallenge/EditChallenge.tsx';
import ChallengeEventsList from './pages/challenges/individualChallenge/ChallengeEventsList.tsx';
import ChallengeEventDetail from './pages/challenges/individualChallenge/ChallengeEventDetail.tsx';
import EditChallengeEvent from './pages/challenges/individualChallenge/EditChallengeEvent.tsx';
import MyChallengeEventsMain from './pages/myChallengeEvent/MyChallengeEventsMain.tsx';
import AllMyChallengeEvents from './pages/myChallengeEvent/AllMyChallengeEvents.tsx';
import MyChallenges from './pages/challenges/MyChallenges.tsx';
import MyCompletedChallenges from './pages/challenges/MyCompletedChallenges.tsx';
import ChallengesByCategory from './pages/challenges/ChallengesByCategory.tsx';
import PostsMain from './pages/posts/PostsMain.tsx';
import MyCompletedEvents from './pages/myChallengeEvent/MyCompletedEvents.tsx';
import MyFailedEvents from './pages/myChallengeEvent/MyFailedEvents.tsx';
import AllPosts from './pages/posts/AllPosts.tsx';
import NewPost from './pages/posts/NewPost.tsx';
import SortedPosts from './pages/posts/SortedPosts.tsx';
import PostDetail from './pages/posts/PostDetail.tsx';
import EditPost from './pages/posts/EditPost.tsx';
import Comments from './pages/posts/Comments.tsx';
import AllComments from './pages/posts/AllComments.tsx';
import NewComment from './pages/posts/NewComment.tsx';
import EditComment from './pages/posts/EditComment.tsx';
import MessageChannelsMain from './pages/message/MessageChannelsMain.tsx';
import AllMessageChannels from './pages/message/AllMessageChannels.tsx';
import ChatRoom from './pages/message/ChatRoom.tsx';
import ChallengeChatRoomList from './pages/message/ChallengeChatRoomList.tsx';
import ChallengeChatRoom from './pages/message/ChallengeChatRoom.tsx';
import SpecificMessage from './pages/message/SpecificMessage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'find-password', element: <FindPassword /> },
      { path: 'my-profile', element: <MyProfile /> },
      { path: 'account/find-email', element: <FindEmail /> },
      { path: 'account/reset-password', element: <ResetPassword /> },

      { path: 'settings/notifications', element: <NotificationSetting /> },
      { path: 'settings/appearances', element: <ThemeSetting /> },
      { path: 'settings/customization', element: <CustomizationSetting /> },
      { path: 'settings/cookie', element: <CookieSetting /> },
      { path: 'settings/block-users', element: <BlockUsersSetting /> },
      { path: 'settings/private-account', element: <PrivateAccountSetting /> },

      {
        path: 'challenges',
        element: <ChallengeMain />,
        children: [
          { index: true, element: <AllChallenges /> },
          { path: 'category/:category', element: <ChallengesByCategory /> },
          { path: 'success-users', element: <SuccessUsers /> },
          { path: 'top', element: <TopChallenges /> },
          { path: 'new', element: <NewChallenges /> },
          {
            path: ':challenge_id',
            element: <ChallengeDetail />,
            children: [
              { index: true, element: <ChallengeDetailDescription /> },
              { path: 'join', element: <JoinChallenge /> },
              { path: 'edit', element: <EditChallenge /> },
              { path: 'events', element: <ChallengeEventsList /> },
              { path: 'events/:event_id', element: <ChallengeEventDetail /> },
              {
                path: 'events/:event_id/edit',
                element: <EditChallengeEvent />,
              },
            ],
          },
        ],
      },
      { path: 'my-challenges', element: <MyChallenges /> },
      { path: 'my-challenges/completed', element: <MyCompletedChallenges /> },
      {
        path: '/my-events',
        element: <MyChallengeEventsMain />,
        children: [
          { index: true, element: <AllMyChallengeEvents /> },
          { path: 'completed', element: <MyCompletedEvents /> },
          { path: 'failed', element: <MyFailedEvents /> },
        ],
      },
      {
        path: 'posts',
        element: <PostsMain />,
        children: [
          { index: true, element: <AllPosts /> },
          { path: 'sort/likes', element: <SortedPosts /> },
          { path: 'new', element: <NewPost /> },
          { path: ':post_id', element: <PostDetail /> },
          { path: ':post_id/edit', element: <EditPost /> },
          {
            path: ':post_id/comments',
            element: <Comments />,
            children: [
              { index: true, element: <AllComments /> },
              { path: 'new', element: <NewComment /> },
            ],
          },
        ],
      },
      { path: 'comments/:comment_id/edit', element: <EditComment /> },
      {
        path: 'message-channels',
        element: <MessageChannelsMain />,
        children: [
          { index: true, element: <AllMessageChannels /> },
          { path: ':channel_id', element: <ChatRoom /> },
          { path: 'challenges', element: <ChallengeChatRoomList /> },
          { path: 'challenges/:challenge_id', element: <ChallengeChatRoom /> },
        ],
      },
      { path: 'messages/:message_id', element: <SpecificMessage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
