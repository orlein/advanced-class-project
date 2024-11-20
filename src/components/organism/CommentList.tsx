import React, { useState } from 'react';
import {
  useGetCommentsByPostIdQuery,
  useCreateCommentMutation,
} from '@/api/commentsApi';
import { useGetUserInfoQuery } from '@/api/accountApi';
import CommentItem from './CommentItem';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { data: commentsData, isLoading } = useGetCommentsByPostIdQuery({ postId, limit: 100 });
  const [createComment] = useCreateCommentMutation();
  const { data: currentUser } = useGetUserInfoQuery();

  const [newComment, setNewComment] = useState('');

  const handleCreateComment = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
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
      {/* 댓글 작성 폼 */}
      {currentUser && (
        <div className="mb-4">
          <Textarea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleCreateComment} className="mt-2">
            댓글 작성
          </Button>
        </div>
      )}
      {/* 댓글 목록 */}
      {commentsData?.data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;
