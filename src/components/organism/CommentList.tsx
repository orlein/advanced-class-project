import React, { useState } from 'react';
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from '@/api/commentsApi';
import { useGetUserInfoQuery } from '@/api/accountApi';
import CommentItem from './CommentItem';
import { Button } from '@/components/ui/button';
import { TextareaAutoSize } from '@/components/molecule/textarea-autosize';
import LoginAlert from '@/components/molecule/LoginAlert';
import ErrorAlert from '@/components/molecule/ErrorAlert';

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { data: commentsData, isLoading } = useGetCommentsByPostIdQuery({ postId, limit: 100 });
  const [createComment] = useCreateCommentMutation();
  const { data: currentUser } = useGetUserInfoQuery();

  const [newComment, setNewComment] = useState('');

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleCreateComment = async () => {
    if (!currentUser) {
      setShowLoginAlert(true);
      return;
    }

    if (!newComment.trim()) {
      setShowErrorAlert(true);
      return;
    }

    try {
      await createComment({ postId, data: { content: newComment } }).unwrap();
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  if (isLoading) {
    return <div>댓글 로딩 중...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      {currentUser && (
        <div className="mb-4">
          <TextareaAutoSize
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            minRows={2}
          />
          <div className="flex justify-end mt-2">
            <Button onClick={handleCreateComment}>댓글 작성</Button>
          </div>
        </div>
      )}
      {/* 댓글 목록 */}
      {commentsData?.data.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          isLast={index === commentsData.data.length - 1}
        />
      ))}

      <LoginAlert showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} />

      <ErrorAlert
        open={showErrorAlert}
        onOpenChange={setShowErrorAlert}
        title="입력 오류"
        description="댓글 내용을 입력해주세요."
      />
    </div>
  );
};

export default CommentList;
