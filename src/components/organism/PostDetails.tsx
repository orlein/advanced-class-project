import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetLikeStatusQuery,
} from '@/api/postsApi';
import { useGetAnotherUserInfoQuery, useGetUserInfoQuery } from '@/api/accountApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, Edit, Trash2, ChevronLeft } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import ReactMarkdown from 'react-markdown';
import ProfileImage from '@/components/molecule/ProfileImage';
import CommentList from '@/components/organism/CommentList';
import LoginAlert from '@/components/molecule/LoginAlert';
import LikeAlert from '@/components/molecule/LikeAlert';
import DeleteConfirmDialog from '@/components/molecule/DeleteConfirmDialog';

export default function PostDetail() {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading, error, refetch: refetchPost } = useGetPostByIdQuery(post_id!);
  const [deletePost] = useDeletePostMutation();

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const { data: signedInUser } = useGetUserInfoQuery();
  const { data: author } = useGetAnotherUserInfoQuery(
    { userId: post?.accountId! },
    { skip: !post },
  );

  const { data: likeStatus, error: likeError } = useGetLikeStatusQuery(
    { postId: post_id! },
    { skip: !post || !signedInUser },
  );

  const [isLikedByMe, setIsLikedByMe] = useState<boolean>(false);

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showLikeAlert, setShowLikeAlert] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (likeStatus) {
      setIsLikedByMe(true);
    } else setIsLikedByMe(false);
  }, [likeStatus, likeError]);

  const handleEdit = () => {
    navigate(`/posts/${post_id}/edit`);
  };

  const handleLike = async () => {
    if (!signedInUser) {
      setShowLoginAlert(true);
      return;
    }

    if (signedInUser.id === post?.accountId) {
      setShowLikeAlert(true);
      return;
    }

    try {
      if (isLikedByMe) {
        await unlikePost(post_id!);
        setIsLikedByMe(false);
      } else {
        await likePost(post_id!);
        setIsLikedByMe(true);
      }
      refetchPost();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(post_id!).unwrap();
      console.log('Post deleted');
      navigate('/posts');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-lg">게시글을 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <div
        onClick={() => navigate(-1)}
        className="self-start flex gap-2 items-center mb-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
      >
        <ChevronLeft size={20} />
        뒤로 가기
      </div>
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">{post.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2">
              <ProfileImage variant="post" url={author?.profileImageUrl ?? ''} />
              <div>
                <p className="text-sm font-semibold">
                  {author?.username ?? author?.id.split('-')[0]}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert lg:prose-lg mb-8 max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          <div className="flex items-center justify-between mt-8">
            <Button
              variant={isLikedByMe ? 'default' : 'outline'}
              onClick={handleLike}
              className="transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              좋아요 {post.likeCount ?? 0}
            </Button>
            {signedInUser && (
              <div className="space-x-2">
                {signedInUser.id === post.accountId && (
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    수정
                  </Button>
                )}
                {(signedInUser.id === post.accountId || signedInUser.role === 'admin') && (
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <CommentList postId={post_id!} />
        </CardContent>
      </Card>

      <LoginAlert showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} />

      <LikeAlert showLikeAlert={showLikeAlert} setShowLikeAlert={setShowLikeAlert} isPost={true} />

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={confirmDelete}
        title="게시글 삭제"
        description="정말로 삭제하시겠습니까? 이 동작은 되돌릴 수 없습니다."
      />
    </div>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <Skeleton className="h-10 w-32 mb-4" />
      <Card className="w-full shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
}
