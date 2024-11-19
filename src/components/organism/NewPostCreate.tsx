'use client';

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '@/api/postsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function NewPostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newPost = {
        title,
        content,
        contentType: 'markdown',
        isDeleted: false,
        type: 'post',
        isCommentAllowed: true,
        isLikeAllowed: true,
      };
      const response = await createPost(newPost).unwrap();
      console.log('Post created:', response);
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">새 글 작성</h2>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용을 입력하세요"
            className="min-h-[300px] resize-none"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-4">
            <Button variant="default" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '작성 중...' : '작성'}
            </Button>
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  );
}
