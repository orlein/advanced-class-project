import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <></>,
    children: [
      { index: true, element: <></> },
      { path: 'sign-in', element: <></> },
      { path: 'sign-up', element: <></> },
      { path: 'find-password', element: <></> },
      { path: 'my-profile', element: <></> },
      {
        path: 'account',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'find-email', element: <></> },
          { path: 'reset-password', element: <></> },
        ],
      },
      {
        path: 'setting',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'notifications', element: <></> },
          { path: 'appearances', element: <></> },
          { path: 'customization', element: <></> },
          { path: 'cookie', element: <></> },
          { path: 'block-users', element: <></> },
          { path: 'private-account', element: <></> },
        ],
      },
      {
        path: 'challenge',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'category/:category', element: <></> },
          { path: 'success-users', element: <></> },
          { path: 'top', element: <></> },
          { path: 'new', element: <></> },
          {
            path: ':challenge_id',
            element: <></>,
            children: [
              { index: true, element: <></> },
              { path: 'join', element: <></> },
              { path: 'edit', element: <></> },
              {
                path: 'events',
                element: <></>,
                children: [
                  { index: true, element: <></> },
                  {
                    path: ':event_id',
                    element: <></>,
                    children: [
                      { index: true, element: <></> },
                      { path: 'edit', element: <></> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'my-challenges',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'completed', element: <></> },
        ],
      },
      {
        path: 'posts',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'new', element: <></> },
          {
            path: ':post_id',
            element: <></>,
            children: [
              { index: true, element: <></> },
              { path: 'edit', element: <></> },
              {
                path: 'comments',
                element: <></>,
                children: [
                  { index: true, element: <></> },
                  { path: 'new', element: <></> },
                ],
              },
            ],
          },

          { path: 'sort/likes', element: <></> },
        ],
      },
      { path: 'comments/:comment_id/edit', element: <></> },

      {
        path: 'my-events',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: 'upcoming', element: <></> },
          { path: 'completed', element: <></> },
          { path: 'failed', element: <></> },
        ],
      },
      {
        path: 'messages-channels',
        element: <></>,
        children: [
          { index: true, element: <></> },
          { path: ':channel_id', element: <></> },
          {
            path: 'challenges',
            element: <></>,
            children: [
              { index: true, element: <></> },
              { path: ':challenge_id', element: <></> },
            ],
          },
        ],
      },
      { path: 'messages/:message_id', element: <></> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
