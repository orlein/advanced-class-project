import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import { accountRouter } from './routers/AccountRouter.tsx';
import { settingRouter } from './routers/SettingRouter.tsx';
import { challengesRouter } from './routers/ChallengesRouter.tsx';
import { myChallengesRouter } from './routers/MyChallengesRouter.tsx';
import { myEventsRouter } from './routers/MyEventsRouter.tsx';
import { postsRouter } from './routers/PostsRouter.tsx';
import { messageChannelsRouter } from './routers/MessageChannelsRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      ...accountRouter,
      ...settingRouter,
      ...challengesRouter,
      ...myChallengesRouter,
      ...myEventsRouter,
      ...postsRouter,
      ...messageChannelsRouter,
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
