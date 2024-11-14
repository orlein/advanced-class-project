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
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { useSelector } from 'react-redux';
import { Switch } from '@/components/ui/switch';

import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useForm } from 'react-hook-form';
import { useUpdateUserInfoMutation } from '@/api/AccountApi';
import { z } from 'zod';
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

const locationOptions = [
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

export default function MyProfile() {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: user?.id,
      username: user?.username,
      bio: user?.bio,
      // interests: user?.interests,
      location: user?.location,
      isPrivate: user?.isPrivate,
      profileImageUrl: user?.profileImageUrl,
    },
  });
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    updateUserInfo(data);
    setIsEditing(false);
    toast({
      title: '프로필 업데이트',
      description: '프로필이 성공적으로 업데이트되었습니다.',
      duration: 3000,
    });
  };

  // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     // useUpdateUserInfoQuery({
  //     //   ...user,
  //     //   profileImageUrl: URL.createObjectURL(e.target.files[0]),
  //     // }),
  //     setIsEditing(false);
  //   }
  // };

  // const handlePrivateAccount = (isPrivate: boolean) => {
  //   toast({
  //     title: '계정 설정',
  //     description: isPrivate ? '비공개 계정으로 설정되었습니다.' : '공개 계정으로 설정되었습니다.',
  //     duration: 3000,
  //   });
  // };

  React.useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form.reset]);

  if (!user) return <></>;

  return (
    <>
      <div className="min-h-screen ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="w-full max-w-4xl mx-auto shadow-lg p-4 flex flex-col gap-5 relative">
              <CardHeader className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 md:gap-10 md:justify-center md:items-center h-[300px] mb-10">
                <div className="flex items-center space-x-2 absolute top-3 right-3">
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            className="dark:data-[state=unchecked]:bg-muted-foreground"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>비공개 계정 설정</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="relative pt-2 mb-2">
                  <Avatar className="size-40 rounded-full mb-4 md:mb-0">
                    <AvatarImage src={user.profileImageUrl} alt="profile" />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <FormField
                    control={form.control}
                    name="profileImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <div
                          className={`${
                            isEditing ? 'block' : 'hidden'
                          } absolute bottom-3 right-0 rounded-full size-8 cursor-pointer bg-foreground shadow-lg flex justify-center items-center`}
                        >
                          <FormLabel>
                            <PencilIcon size={18} className="text-background" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={field.onChange}
                              defaultValue={user?.username}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>닉네임</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className={`text-xl p-2 w-full h-10 text-center border border-muted-foreground rounded-md font-bold placeholder:font-normal`}
                            placeholder="username"
                            onChange={field.onChange}
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
                      <FormItem>
                        <FormLabel>자기소개</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className={`text-xl p-2 w-full h-10 text-center border border-muted-foreground rounded-md font-bold placeholder:font-normal`}
                            placeholder="bio"
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardHeader>
              {/* <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>관심사</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      {...register(field as keyof ExtraUserInfo)}
                      className="w-full p-3 border border-muted-foreground rounded-md text-sm disabled:opacity-100 disabled:border-background disabled:shadow-none"
                      disabled={!isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />  */}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="지역을 선택하세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationOptions.map(option => (
                          <SelectItem value={option} key={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button className="font-semibold py-3 px-8 rounded-md transition">취소하기</Button>
              <Button className="font-semibold py-3 px-8 rounded-md transition">수정하기</Button>
            </Card>
            <Toaster />
          </form>
        </Form>
      </div>
    </>
  );
}
