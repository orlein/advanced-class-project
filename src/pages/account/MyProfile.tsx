import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useForm } from 'react-hook-form';
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '@/api/accountApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { profileSchema } from '@/lib/schemas/userInfoSchema';
import { ProfileData } from '@/types/userData';
import { Textarea } from '@/components/ui/textarea';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import ProfileImage from '@/components/molecule/ProfileImage';
import { Toggle } from '@/components/ui/toggle';
import { NATIONALITY_OPTIONS, TAG_OPTIONS } from '@/constants/myProfile';
import { useUploadImageMutation } from '@/api/imageApi';
import { v4 as uuid } from 'uuid';

const DISABLED_STYLE =
  'disabled:border-none disabled:shadow-none disabled:cursor-default disabled:opacity-100';

export default function MyProfile() {
  const { toast } = useToast();
  const id = sessionStorage.getItem('userId');
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: user, isLoading, refetch } = useGetUserInfoQuery();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(user?.profileImageUrl ?? '');
  const [tags, setTags] = useState<string[]>([]);
  const defaultValues = useMemo<ProfileData>(
    () => ({
      username: user?.username ?? '',
      bio: user?.bio,
      nationality: user?.nationality,
      isPrivate: user?.isPrivate ?? false,
      profileImageUrl: user?.profileImageUrl ?? '',
    }),
    [user],
  );
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileData) => {
    // 관심사 추가 api 요청 필요
    // 현재는 상태로만 구현해둠
    if (id) {
      updateUserInfo({
        id,
        ...data,
        profileImageUrl: profileImage,
      }).then(res => {
        if (!res.error) {
          setIsEditing(false);
          toast({
            title: '프로필 업데이트',
            description: '프로필이 성공적으로 업데이트되었습니다.',
            duration: 3000,
          });
          refetch();
        }
      });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user && id) {
      const profileImageInput = e.target.files[0];
      const filename = uuid();
      const [, extension] = profileImageInput.name.split('.');
      const sizeInKb = Math.round(profileImageInput.size / 1000).toString();

      const formData = new FormData();
      formData.delete('file');
      formData.append(
        'file',
        profileImageInput,
        `${filename}.${extension};type=${profileImageInput.type}`,
      );
      formData.append('type', 'account');
      formData.append('id', id);
      formData.append('filename', filename);
      formData.append('extension', extension.toLocaleLowerCase());
      formData.append('sizeInKb', sizeInKb);
      formData.append('width', '300');
      formData.append('height', '300');

      uploadImage(formData).then(res => res.data && setProfileImage(res.data.url));
    }
  };

  const handlePrivateAccount = (isPrivate: boolean) => {
    toast({
      title: '계정 설정',
      description: `${
        isPrivate ? '비공개 계정으로 설정되었습니다.' : '공개 계정으로 설정되었습니다.'
      }\n저장하기를 눌러주세요.`,
      duration: 3000,
    });
  };

  const handleSelectTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTag = e.currentTarget.innerText;
    if (tags.includes(clickedTag)) {
      setTags(prev => prev.filter(tag => tag !== clickedTag));
    } else {
      setTags(prev => [...prev, clickedTag]);
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    setProfileImage(user?.profileImageUrl ?? '');
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (!isLoading && user) {
      form.reset(defaultValues);
      setProfileImage(user.profileImageUrl ?? '');
    }
  }, [user, isLoading, form, defaultValues]);

  if (!user) return <></>;
  return (
    <>
      <div className="h-full flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <Card className="w-full max-w-xl mx-auto shadow-lg px-6 pt-14 pb-7 flex flex-col items-center gap-5 relative">
              <div className="flex items-center absolute top-2 right-2">
                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        비공개 계정
                        <FormControl>
                          <Switch
                            className="dark:data-[state=unchecked]:bg-muted-foreground disabled:cursor-default"
                            checked={field.value}
                            onCheckedChange={e => {
                              handlePrivateAccount(!field.value);
                              field.onChange(e);
                            }}
                            disabled={!isEditing}
                          />
                        </FormControl>
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <section className="w-full flex flex-col sm:flex-row justify-center items-center gap-5">
                <div className="relative">
                  <ProfileImage
                    url={profileImage}
                    variant="myProfile"
                    setProfileImage={setProfileImage}
                  />
                  {isEditing && (
                    <div className="absolute bottom-2 right-2 rounded-full size-9 cursor-pointer bg-foreground shadow-lg flex justify-center items-center">
                      <FormField
                        control={form.control}
                        name="profileImageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Camera size={20} className="text-background cursor-pointer" />
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                  if (e.target.files) {
                                    handleAvatarChange(e);
                                    field.onChange(e);
                                  }
                                }}
                                className="hidden"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 items-start w-full">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-bold pl-2">닉네임</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            className={`${DISABLED_STYLE} disabled:pl-[9px] text-lg p-2 outline-none border border-muted-foreground rounded-md font-bold placeholder:font-normal`}
                            placeholder="username"
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="font-bold pl-2">자기소개</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ''}
                            className={`${DISABLED_STYLE} disabled:pl-[9px] disabled:py-[5px] py-1 px-2 h-20 resize-none leading-relaxed border border-muted-foreground rounded-md placeholder:font-normal`}
                            placeholder="자기소개를 입력해 주세요."
                            disabled={!isEditing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold pl-3">지역</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ''}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`${DISABLED_STYLE} disabled:pl-[13px] border border-muted-foreground`}
                        >
                          <SelectValue placeholder="지역을 선택하세요." />
                          {isEditing && <CaretSortIcon className="h-4 w-4 opacity-50" />}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NATIONALITY_OPTIONS.map(option => (
                          <SelectItem value={option} key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <section className="w-full px-2">
                <Label className="pl-1 font-bold">관심사</Label>
                <section
                  className={`grid ${tags.length === 0 && !isEditing && 'grid-cols-1'} ${
                    (tags.length > 0 || isEditing) && 'grid-cols-2 md:grid-cols-3 gap-3'
                  } mt-4`}
                >
                  {isEditing &&
                    TAG_OPTIONS.map(tag => (
                      <Toggle
                        variant="outline"
                        key={tag}
                        onClick={handleSelectTags}
                        pressed={tags.includes(tag)}
                      >
                        {tag}
                      </Toggle>
                    ))}
                  {!isEditing &&
                    tags.length !== 0 &&
                    tags.map(tag => (
                      <Toggle
                        variant="outline"
                        key={tag}
                        onClick={handleSelectTags}
                        disabled
                        className={DISABLED_STYLE}
                      >
                        {tag}
                      </Toggle>
                    ))}
                  {!isEditing && tags.length === 0 && (
                    <p className="pl-1 text-sm">관심사를 선택하세요.</p>
                  )}
                </section>
              </section>

              {isEditing && (
                <div className="flex gap-3">
                  <Button
                    type="reset"
                    onClick={handleReset}
                    className="font-semibold py-3 px-8 rounded-md transition"
                  >
                    취소하기
                  </Button>
                  <Button
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                    className="font-semibold py-3 px-8 rounded-md transition"
                  >
                    저장하기
                  </Button>
                </div>
              )}

              {!isEditing && (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  수정하기
                </Button>
              )}
            </Card>
            <Toaster />
          </form>
        </Form>
      </div>
    </>
  );
}
