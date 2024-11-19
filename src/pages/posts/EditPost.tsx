import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from '@/api/postsApi';
import PostForm from '@/components/organism/PostForm';

export default function EditPost() {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();

  const { data: post, isLoading } = useGetPostByIdQuery(post_id!);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

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
      alert('게시글이 수정되었습니다.');
      navigate(`/posts/${post_id}`);
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  if (isLoading || !post) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">게시글 수정</h1>
      <PostForm
        defaultValues={{ title: post.title, content: post.content }}
        onSubmit={onSubmit}
        isLoading={isUpdating}
        submitText="수정 완료"
      />
    </div>
  );
}
