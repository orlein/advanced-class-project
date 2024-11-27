import { useUploadImageMutation } from '@/api/imageApi';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import useChallengeMutations from '@/hooks/useChallengeMutations';
import useChallenges from '@/hooks/useChallenges';
import { newChallengeFormSchema } from '@/lib/schemas/challengeSchema';
import { cn } from '@/lib/utils';
import { NewChallengeFormData, UpdateChallengeRequestData } from '@/types/challenge';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Label } from '../ui/label';

const ChallengeForm = ({
  isNew = false,
  challengeId,
}: {
  isNew?: boolean;
  challengeId?: string;
}) => {
  const navigate = useNavigate();
  const { createNewChallenge, updateChallenge, joinChallenge, updateChallengeImage } =
    useChallengeMutations();
  const [uploadImage] = useUploadImageMutation();
  const { challengeInfo } = useChallenges(challengeId ?? '');
  const [imageInput, setImageInput] = useState<File | undefined>();
  const defaultValues = challengeInfo
    ? {
        title: challengeInfo.title,
        description: challengeInfo.description,
        startDate: new Date(challengeInfo.startDate),
        endDate: new Date(challengeInfo.endDate),
      }
    : {
        title: '',
        description: '',
        startDate: new Date(),
        endDate: undefined,
      };
  const form = useForm<NewChallengeFormData>({
    resolver: zodResolver(newChallengeFormSchema),
    defaultValues,
  });
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const challengeImageInput = e.target.files[0];
      setImageInput(challengeImageInput);
    }
  };
  const uploadImageFormData = async (challengeImageInput: File, id: string) => {
    const filename = uuid();
    const [, extension] = challengeImageInput.name.split('.');
    const sizeInKb = Math.round(challengeImageInput.size / 1000).toString();

    const formData = new FormData();
    formData.delete('file');
    formData.append(
      'file',
      challengeImageInput,
      `${filename}.${extension};type=${challengeImageInput.type}`,
    );
    formData.append('type', 'challenge');
    formData.append('id', id);
    formData.append('filename', filename);
    formData.append('extension', extension.toLocaleLowerCase());
    formData.append('sizeInKb', sizeInKb);
    formData.append('width', '300');
    formData.append('height', '300');

    const url = await uploadImage(formData).then(res => res.data?.url ?? '');
    return url;
  };

  const onSubmit = async (data: NewChallengeFormData) => {
    const challengeData = {
      ...data,
      startDate: data.startDate.toString(),
      endDate: data.endDate.setDate(data.endDate.getDate() + 1).toString(),
      type: 'challenge',
      isFinished: false,
      isDeleted: false,
      isPublished: false,
    };
    if (isNew) {
      createNewChallenge(challengeData).then(async res => {
        if (res.data) {
          if (imageInput) {
            const url = await uploadImageFormData(imageInput, res.data.id);
            updateChallengeImage({
              challengeId: res.data.id,
              updateData: { challengeImageUrl: url },
            });
          }
          joinChallenge({ challengeId: res.data.id });
          navigate('/challenges');
        }
      });
    } else if (challengeId) {
      const url = imageInput
        ? await uploadImageFormData(imageInput, challengeId)
        : challengeInfo?.challengeImageUrl ?? '';
      const updateChallengeData: UpdateChallengeRequestData = {
        updateData: { ...challengeData, challengeImageUrl: url },
        challengeId,
      };
      updateChallenge(updateChallengeData).then(res => {
        if (res.data) navigate('/challenges');
      });
    }
  };
  useEffect(() => {
    if (challengeInfo) {
      form.reset({
        title: challengeInfo.title,
        description: challengeInfo.description,
        startDate: new Date(challengeInfo.startDate),
        endDate: new Date(challengeInfo.endDate),
      });
    }
  }, [challengeInfo, form]);
  return (
    <div className="flex justify-center w-full">
      <section className="w-full max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="shrink-0 pt-2">시작</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>시작 날짜를 선택하세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel className="shrink-0 pt-2">종료</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>종료 날짜를 선택하세요.</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel className="shrink-0 pt-2">제목</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-start">
                  <FormLabel className="shrink-0 pt-4">내용</FormLabel>
                  <FormControl className="w-full">
                    <Textarea {...field} className="resize-none h-[300px]" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center mt-2">
              <Label className="shrink-0">사진</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={e => {
                  if (e.target.files) {
                    handleImageUpload(e);
                  }
                }}
              />
            </div>

            <Button type="submit" className="self-end my-3">
              등록
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default ChallengeForm;
