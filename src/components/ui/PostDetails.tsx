import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetLikeStatusQuery,
} from '@/features/posts/postsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';
import { useGetCurrentUserQuery } from '@/api/accountApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import ReactMarkdown from 'react-markdown';

export default function PostDetail() {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading, error, refetch: refetchPost } = useGetPostByIdQuery(post_id!);
  const [deletePost] = useDeletePostMutation();

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const { data: likeStatus, error: likeError } = useGetLikeStatusQuery(post_id!, {
    skip: !post_id || !currentUser,
  });

  const [currentLikeStatus, setCurrentLikeStatus] = useState<'like' | null>(null);

  useEffect(() => {
    if (likeStatus !== undefined) {
      setCurrentLikeStatus(likeStatus);
    } else if (
      likeError &&
      (likeError as FetchBaseQueryError).status === 404
    ) {
      setCurrentLikeStatus(null);
    }
  }, [likeStatus, likeError]);

  const handleEdit = () => {
    navigate(`/posts/${post_id}/edit`);
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (currentUser.id === post?.accountId) {
      alert('자신의 게시물은 추천할 수 없습니다.');
      return;
    }

    try {
      if (currentLikeStatus === 'like') {
        await unlikePost(post_id!).unwrap();
        setCurrentLikeStatus(null);
      } else {
        await likePost(post_id!).unwrap();
        setCurrentLikeStatus('like');
      }
      // 좋아요 상태 변경 후 게시물 데이터 갱신
      refetchPost();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deletePost(post_id!).unwrap();
        console.log('Post deleted');
        navigate('/posts');
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  if (error || !post) {
    return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen px-8 py-12">
      <Card className="w-full max-w-4xl mx-auto shadow-lg p-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">{post.title}</CardTitle>
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={'/path/to/avatar.jpg'} alt={post.accountId} />
              <AvatarFallback>{post.accountId.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{post.accountId}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose lg:prose-xl mb-8 max-w-none">
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button
              variant={currentLikeStatus === 'like' ? 'default' : 'outline'}
              onClick={handleLike}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              좋아요 {post.likeCount ?? 0}
            </Button>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            {currentUser && (
              <>
                {currentUser.id === post.accountId && (
                  <Button variant="default" onClick={handleEdit}>
                    수정
                  </Button>
                )}
                {(currentUser.id === post.accountId || currentUser.role === 'admin') && (
                  <Button variant="destructive" onClick={handleDelete}>
                    삭제
                  </Button>
                )}
              </>
            )}
            <Button variant="outline" onClick={() => navigate('/posts')}>
              목록으로 돌아가기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
