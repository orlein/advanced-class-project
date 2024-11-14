import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useDislikePostMutation,
  useUndislikePostMutation,
  useGetLikeStatusQuery,
} from '@/features/posts/postsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function PostDetail() {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading, error } = useGetPostByIdQuery(post_id!);
  const [deletePost] = useDeletePostMutation();

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const [undislikePost] = useUndislikePostMutation();

  const { data: likeData } = useGetLikeStatusQuery(post_id!);
  const [likeStatus, setLikeStatus] = useState<'liked' | 'disliked' | null>(null);

  useEffect(() => {
    if (likeData) {
      setLikeStatus(likeData.type === 'like' ? 'liked' : 'disliked');
    }
  }, [likeData]);

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

  const handleEdit = () => {
    navigate(`/posts/${post_id}/edit`);
  };

  const handleLike = async () => {
    try {
      if (likeStatus === 'liked') {
        await unlikePost(post_id!).unwrap();
        setLikeStatus(null);
      } else {
        await likePost(post_id!).unwrap();
        setLikeStatus('liked');
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      if (likeStatus === 'disliked') {
        await undislikePost(post_id!).unwrap();
        setLikeStatus(null);
      } else {
        await dislikePost(post_id!).unwrap();
        setLikeStatus('disliked');
      }
    } catch (error) {
      console.error('Failed to dislike post:', error);
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
          <div className="prose lg:prose-xl mb-8 max-w-none">{post.content}</div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant={likeStatus === 'liked' ? 'default' : 'outline'} onClick={handleLike}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              좋아요 {post.likeCount}
            </Button>
            <Button
              variant={likeStatus === 'disliked' ? 'default' : 'outline'}
              onClick={handleDislike}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              싫어요 {post.dislikeCount}
            </Button>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="default" onClick={handleEdit}>
              수정
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
            <Button variant="outline" onClick={() => navigate('/posts')}>
              목록으로 돌아가기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
