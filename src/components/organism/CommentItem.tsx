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
import { TextareaAutoSize } from '@/components/molecule/textarea-autosize';
import { ThumbsUp } from 'lucide-react';
import { Comment } from '@/types/commentTypes';
import LoginAlert from '@/components/molecule/LoginAlert';
import ErrorAlert from '@/components/molecule/ErrorAlert';
import DeleteConfirmDialog from '@/components/molecule/DeleteConfirmDialog';

interface CommentItemProps {
  comment: Comment;
  postId: string;
  isLast: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, isLast }) => {
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

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setCurrentLikeStatus(likeStatus ?? null);
  }, [likeStatus]);

  const handleDelete = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteComment({ postId, commentId: comment.id }).unwrap();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedContent.trim()) {
      setShowErrorAlert(true);
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
      setShowLoginAlert(true);
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
    <div className={`py-4 ${!isLast ? 'border-b' : ''}`}>
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
          <TextareaAutoSize
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            minRows={2}
          />
          <div className="flex justify-end mt-2">
            <Button onClick={handleUpdate}>수정 완료</Button>
          </div>
        </div>
      ) : (
        <p className="mt-2 break-all whitespace-pre-wrap">{comment.content}</p>
      )}
      <div className="flex justify-end mt-2">
        <Button
          variant={currentLikeStatus === 'like' ? 'default' : 'outline'}
          size="sm"
          onClick={handleLike}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          좋아요 {comment.likeCount ?? 0}
        </Button>
      </div>

      <LoginAlert showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} />

      <ErrorAlert
        open={showErrorAlert}
        onOpenChange={setShowErrorAlert}
        title="입력 오류"
        description="댓글 내용을 입력해주세요."
      />

      <DeleteConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={confirmDelete}
        title="댓글 삭제"
        description="댓글을 삭제하시겠습니까?"
      />
    </div>
  );
};

export default CommentItem;
