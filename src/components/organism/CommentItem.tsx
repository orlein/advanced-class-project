import React, { useState, useEffect } from 'react';
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useGetCommentLikeStatusQuery,
} from '@/api/commentsApi';
import { useGetUserInfoQuery } from '@/api/accountApi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp } from 'lucide-react';
import { Comment } from '@/types/commentTypes';

interface CommentItemProps {
  comment: Comment;
  postId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId }) => {
  const { data: currentUser } = useGetUserInfoQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const { data: likeStatus } = useGetCommentLikeStatusQuery(
    { postId, commentId: comment.id },
    { skip: !currentUser },
  );

  const [currentLikeStatus, setCurrentLikeStatus] = useState<'like' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    setCurrentLikeStatus(likeStatus ?? null);
  }, [likeStatus]);

  const handleDelete = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await deleteComment({ postId, commentId: comment.id }).unwrap();
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editedContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await updateComment({
        postId,
        commentId: comment.id,
        data: { content: editedContent },
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      if (currentLikeStatus === 'like') {
        await unlikeComment({ postId, commentId: comment.id }).unwrap();
        setCurrentLikeStatus(null);
      } else {
        await likeComment({ postId, commentId: comment.id }).unwrap();
        setCurrentLikeStatus('like');
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{comment.accountUsername || comment.accountId}</p>
          <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
        </div>
        {currentUser && currentUser.id === comment.accountId && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? '취소' : '수정'}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="mt-2">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <Button onClick={handleUpdate} className="mt-2">
            수정 완료
          </Button>
        </div>
      ) : (
        <p className="mt-2">{comment.content}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <Button
          variant={currentLikeStatus === 'like' ? 'default' : 'outline'}
          size="sm"
          onClick={handleLike}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          좋아요 {comment.likeCount ?? 0}
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;
