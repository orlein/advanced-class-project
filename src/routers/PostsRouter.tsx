import AllComments from '@/pages/posts/AllComments';
import AllPosts from '@/pages/posts/AllPosts';
import Comments from '@/pages/posts/Comments';
import EditComment from '@/pages/posts/EditComment';
import EditPost from '@/pages/posts/EditPost';
import NewComment from '@/pages/posts/NewComment';
import NewPost from '@/pages/posts/NewPost';
import PostDetail from '@/pages/posts/PostDetail';
import PostsMain from '@/pages/posts/PostsMain';
import SortedPosts from '@/pages/posts/SortedPosts';

export const postsRouter = [
  {
    path: 'posts',
    element: <PostsMain />,
    children: [
      { index: true, element: <AllPosts /> },
      { path: 'sort/likes', element: <SortedPosts /> },
      { path: 'new', element: <NewPost /> },
      { path: ':post_id/edit', element: <EditPost /> },
      { path: ':post_id', element: <PostDetail /> },
      { path: 'sort/likes', element: <SortedPosts /> },
      {
        path: ':post_id',
        children: [
          {
            path: 'comments',
            element: <Comments />,
            children: [
              { index: true, element: <AllComments /> },
              { path: 'new', element: <NewComment /> },
            ],
          },
        ],
      },
    ],
  },
  { path: 'comments/:comment_id/edit', element: <EditComment /> },
];
