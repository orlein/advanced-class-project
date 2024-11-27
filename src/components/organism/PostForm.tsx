import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme-provider';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '@/styles/markdown-editor.css';

interface PostFormProps {
  defaultValues?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
  isLoading?: boolean;
  submitText: string;
}

const mdParser = new MarkdownIt();

export default function PostForm({ defaultValues, onSubmit, isLoading, submitText }: PostFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultValues || { title: '', content: '' },
  });

  const { theme, systemTheme } = useTheme();
  const [editorKey, setEditorKey] = useState(0);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setEditorKey((prevKey) => prevKey + 1);
  }, [theme, systemTheme]);

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    setValue('content', text);
  };

  const content = watch('content');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto border rounded-lg">
      <h1 className="text-3xl font-bold mb-8">게시글 수정</h1>
      <div className="w-full shadow-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              {...register('title', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <div className="rounded-md overflow-hidden">
              <MdEditor
                key={editorKey}
                id="content"
                value={content}
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                className={`${currentTheme === 'dark' ? 'md-editor-dark' : ''} md-editor-custom`}
                config={{
                  view: {
                    menu: true,
                    md: true,
                    html: false,
                  },
                  canView: {
                    menu: true,
                    md: true,
                    html: false,
                    fullScreen: false,
                    hideMenu: false,
                  },
                  markdownClass: 'markdown-body',
                }}
                placeholder="내용을 입력하세요..."
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '처리 중...' : submitText}
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
