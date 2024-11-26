import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '@/api/postsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '@/styles/markdown-editor.css';
import { ChevronLeft } from 'lucide-react';

const mdParser = new MarkdownIt();

export default function NewPostCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorKey, setEditorKey] = useState(0);

  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setEditorKey(prevKey => prevKey + 1);
  }, [theme, systemTheme]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 내용을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

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
      toast({
        title: "게시글 작성 완료",
        description: "새 게시글이 성공적으로 작성되었습니다.",
      });
      navigate(`/posts/${response.id}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      toast({
        title: "게시글 작성 실패",
        description: "게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('정말로 초기화하시겠습니까? 작성 중인 내용이 모두 삭제됩니다.')) {
      setTitle('');
      setContent('');
      toast({
        title: "초기화 완료",
        description: "작성 중인 내용이 모두 삭제되었습니다.",
      });
    }
  };

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    setContent(text);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

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
          <CardTitle className="text-2xl md:text-3xl font-bold">새 글 작성</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <Button variant="outline" onClick={handleReset}>
              초기화
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? '작성 중...' : '작성'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Outlet />
    </div>
  );
}

