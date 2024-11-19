import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PostFormProps {
  defaultValues?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
  isLoading?: boolean;
  submitText: string;
}

export default function PostForm({ defaultValues, onSubmit, isLoading, submitText }: PostFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues || { title: '', content: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">제목</label>
        <Input
          type="text"
          {...register('title', { required: true })}
          className="w-full"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">내용</label>
        <Textarea
          {...register('content', { required: true })}
          className="w-full h-64"
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : submitText}
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
