"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from "@/features/posts/postsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading: isFetching } = useGetPostByIdQuery(id!);
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = async () => {
    try {
      await updatePost({ id: id!, data: { title, content } }).unwrap();
      console.log('Post updated');
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isFetching) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">글 수정</h2>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용을 입력하세요"
            className="min-h-[300px] resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-4">
            <Button variant="default" onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating ? '수정 중...' : '수정'}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
