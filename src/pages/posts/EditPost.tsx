import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from '@/api/postsApi';
import PostForm from '@/components/organism/PostForm';
import { ChevronLeft } from 'lucide-react';
import SuccessAlert from '@/components/molecule/SuccessAlert';
import ErrorAlert from '@/components/molecule/ErrorAlert';

export default function EditPost() {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading } = useGetPostByIdQuery(post_id!);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const onSubmit = async (data: { title: string; content: string }) => {
    if (!post) return;

    try {
      const updatedData = {
        title: data.title,
        content: data.content,
        contentType: post.contentType,
        isDeleted: post.isDeleted,
        isCommentAllowed: post.isCommentAllowed,
        isLikeAllowed: post.isLikeAllowed,
        type: post.type,
      };
      await updatePost({ id: post_id!, data: updatedData }).unwrap();
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Failed to update post:', error);
      setShowErrorAlert(true);
    }
  };

  if (isLoading || !post) {
    return <div className="text-center mt-20">로딩 중...</div>;
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
      <PostForm
        defaultValues={{ title: post.title, content: post.content }}
        onSubmit={onSubmit}
        isLoading={isUpdating}
        submitText="수정 완료"
      />

      <SuccessAlert
        open={showSuccessAlert}
        onOpenChange={(open) => {
          setShowSuccessAlert(open);
          if (!open) {
            navigate(`/posts/${post_id}`);
          }
        }}
        title="게시글 수정 완료"
        description="게시글이 성공적으로 수정되었습니다."
      />

      <ErrorAlert
        open={showErrorAlert}
        onOpenChange={setShowErrorAlert}
        title="게시글 수정 실패"
        description="게시글 수정 중 오류가 발생했습니다."
      />
    </div>
  );
}
