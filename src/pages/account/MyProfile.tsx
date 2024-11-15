import * as React from 'react';
import { Card, CardHeader } from '@/components/ui/card.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { PencilIcon, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { useSelector } from 'react-redux';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useForm } from 'react-hook-form';
import { useUpdateUserInfoMutation } from '@/api/accountApi';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RootState } from '@/RTK/store';
import { profileSchema } from '@/lib/schemas/userInfoSchema';
import { ProfileData } from '@/types/userData';
import { Textarea } from '@/components/ui/textarea';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import ProfileImage from '@/components/molecule/ProfileImage';

const nationalityOptions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

const tagOptions = [
  '태그1',
  '태그2',
  '태그3',
  '태그4',
  '태그5',
  '태그6',
  '태그7',
  '태그8',
  '태그9',
];

export default function MyProfile() {
  const { toast } = useToast();
  const id = useSelector((state: RootState) => state.auth.userId);
  const userState = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<ProfileData>();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(userState?.profileImageUrl ?? '');
  const [tags, setTags] = useState<string[]>([]);
  console.log(userState);
  const defaultValues = {
    username: userState?.username,
    bio: userState?.bio,
    nationality: userState?.nationality,
    isPrivate: userState?.isPrivate,
    profileImageUrl: userState?.profileImageUrl,
  };
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileData) => {
    // 관심사 추가 api 요청 필요
    // 현재는 상태로만 구현해둠
    console.log(data);
    if (id) {
      updateUserInfo({ id, ...data, profileImageUrl: profileImage }).then(res => {
        if (!res.error) {
          setIsEditing(false);
          toast({
            title: '프로필 업데이트',
            description: '프로필이 성공적으로 업데이트되었습니다.',
            duration: 3000,
          });
        }
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profileImageInput = e.target.files?.[0];
    if (profileImageInput) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(profileImageInput);
    }
  };

  const handlePrivateAccount = (isPrivate: boolean) => {
    toast({
      title: '계정 설정',
      description: isPrivate ? '비공개 계정으로 설정되었습니다.' : '공개 계정으로 설정되었습니다.',
      duration: 3000,
    });
  };

  const handleSelectTags = e => {
    const clickedTag = e.target.innerText;
    if (tags.includes(clickedTag)) {
      setTags(prev => prev.filter(tag => tag !== clickedTag));
    } else {
      setTags(prev => [...prev, clickedTag]);
    }
  };

  const handleReset = () => {
    form.reset(defaultValues);
    setProfileImage(userState?.profileImageUrl ?? '');
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (userState) {
      const { username, bio, nationality, isPrivate, profileImageUrl } = userState;
      setUser({ username, bio, nationality, isPrivate, profileImageUrl });
    }
  }, [userState]);

  React.useEffect(() => {
    if (user) form.reset(user);
  }, [user, form]);

  if (!userState) return <></>;
  return (
    <>
      <div className="min-h-screen ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full max-w-xl mx-auto shadow-lg px-4 pt-14 pb-7 flex flex-col items-center gap-5 relative">
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
                            className="dark:data-[state=unchecked]:bg-muted-foreground"
                            checked={field.value || false}
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

              <section className="w-full flex flex-col sm:flex-row justify-center items-center gap-7">
                <div className="relative">
                  <ProfileImage url={profileImage} size="40" />
                  <div className="absolute bottom-2 right-2 rounded-full size-9 cursor-pointer bg-foreground shadow-lg flex justify-center items-center">
                    <FormField
                      control={form.control}
                      name="profileImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <PencilIcon size={20} className="text-background cursor-pointer" />
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
                </div>
                <div className="flex flex-col gap-3 items-start w-full">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="pl-2">닉네임</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="text-lg p-2 outline-none border border-muted-foreground rounded-md font-bold placeholder:font-normal disabled:border-none disabled:opacity-100"
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
                        <FormLabel className="pl-2">자기소개</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="p-2 border border-muted-foreground rounded-md placeholder:font-normal disabled:border-none disabled:opacity-100 resize-none"
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
                    <FormLabel className="pl-3">지역</FormLabel>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`${isEditing && 'disabled:border-none disabled:opacity-100'}`}
                        >
                          <SelectValue placeholder="지역을 선택하세요." />
                          {isEditing && <CaretSortIcon className="h-4 w-4 opacity-50" />}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalityOptions.map(option => (
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
                <Label>관심사</Label>
                <section className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {isEditing &&
                    tagOptions.map(tag => (
                      <Button type="button" key={tag} onClick={handleSelectTags}>
                        {tag}
                      </Button>
                    ))}
                  {!isEditing &&
                    tags.map(tag => (
                      <Button type="button" key={tag} onClick={handleSelectTags}>
                        {tag}
                      </Button>
                    ))}
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
