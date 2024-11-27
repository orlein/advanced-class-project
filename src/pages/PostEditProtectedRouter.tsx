import { useGetPostByIdQuery } from '@/api/postsApi';
import { RootState } from '@/RTK/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

type ProtectedRouterProps = {
  children: ReactNode;
};

const PostEditProtectedRouter = ({ children }: ProtectedRouterProps) => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const userId = sessionStorage.getItem('userId');
  const { post_id: postId } = useParams();
  const { data: post } = useGetPostByIdQuery(postId ?? '');
  if (!isSignedIn || userId !== post?.accountId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PostEditProtectedRouter;
