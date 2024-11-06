import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/RTK/store';
import { User } from '@/RTK/slice';
import { updateUserInfo } from '@/RTK/thunk';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { SELECT_MENUS } from '@/constants/myProfileMenus';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useForm, Controller } from 'react-hook-form';

export default function MyProfile() {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user || {},
  });

  const onSubmit = (data: User) => {
    dispatch(updateUserInfo(data));
    setIsEditing(false);
    toast({
      title: '프로필 업데이트',
      description: '프로필이 성공적으로 업데이트되었습니다.',
      duration: 3000,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(
          updateUserInfo({
            ...user!,
            profileImageUrl: URL.createObjectURL(e.target.files[0]),
          }),
      );
      setIsEditing(false);
    }
  };

  const handlePrivateAccount = (isPrivate: boolean) => {
    dispatch(updateUserInfo({ ...user!, isPrivate }));
    toast({
      title: '계정 설정',
      description: isPrivate ? '비공개 계정으로 설정되었습니다.' : '공개 계정으로 설정되었습니다.',
      duration: 3000,
    });
  };

    React.useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);


  return (
      <>
        {user && (
            <div className="min-h-screen ">
              <Card className="w-full max-w-4xl mx-auto shadow-lg p-4 flex flex-col gap-5 relative">
                <CardHeader className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 md:gap-10 md:justify-center md:items-center h-[300px] mb-10">
                  <div className="flex items-center space-x-2 absolute top-3 right-3">
                    <Switch
                        id="private-account"
                        className="dark:data-[state=unchecked]:bg-muted-foreground"
                        checked={user!.isPrivate}
                        onCheckedChange={handlePrivateAccount}
                    />
                    <Label htmlFor="private-account">비공개 계정</Label>
                  </div>

                  <div className="relative pt-2 mb-2">
                    <Avatar className="size-40 rounded-full mb-4 md:mb-0">
                      <AvatarImage src={user.profileImageUrl} alt="profile" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div
                        className={`${
                            isEditing ? 'block' : 'hidden'
                        } absolute bottom-3 right-0 rounded-full size-8 cursor-pointer bg-foreground shadow-lg flex justify-center items-center`}
                    >
                      <label htmlFor="avatar-input">
                        <PencilIcon size={18} className="text-background" />
                      </label>
                      <Input
                          id="avatar-input"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start w-full">
                    {isEditing ? (
                        <Input
                            type="text"
                            {...register('username', { required: '이름은 필수 항목입니다.' })}
                            className={`text-xl p-2 w-full h-10 text-center border border-muted-foreground rounded-md font-bold placeholder:font-normal`}
                            placeholder="username"
                        />
                    ) : (
                        <p className="h-10 relative top-[5.7px] md:top-[1.3px] w-full text-2xl md:text-3xl font-bold border border-background  text-center">
                          {user.username}
                        </p>
                    )}
                    {isEditing ? (
                        <Input
                            type="text"
                            {...register('bio')}
                            className={`${
                                isEditing ? 'text-sm' : 'text-sm md:text-md'
                            } p-2 w-full h-9 text-center border border-muted-foreground rounded-md`}
                            placeholder="bio"
                        />
                    ) : (
                        <p className="h-9 w-full p-2 relative -top-[0.4px] text-sm border border-background content-center text-center">
                          {user.bio}
                        </p>
                    )}
                  </div>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { field: 'email', label: '이메일', type: 'text' },
                      { field: 'birthday', label: '생일', type: 'text' },
                      { field: 'externalUrl', label: '외부 URL', type: 'text' },
                      { field: 'interests', label: '관심사', type: 'text' },
                    ].map(({ field, label, type }) => (
                        <div key={field} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex gap-3 items-center">
                              <h2 className="pl-3 text-xl font-semibold mb-1">{label}</h2>
                            </div>
                            <Input
                                type={type}
                                {...register(field as keyof User)}
                                className="w-full p-3 border border-muted-foreground rounded-md text-sm disabled:opacity-100 disabled:border-background disabled:shadow-none"
                                disabled={!isEditing}
                            />
                            {errors[field as keyof User] && (
                                <span className="text-red-500 text-sm">
                          {errors[field as keyof User]?.message}
                        </span>
                            )}
                          </div>
                        </div>
                    ))}
                    {SELECT_MENUS.map(menu => (
                        <div key={menu.field} className="flex items-center justify-between">
                          <div className="flex-1">
                            <h2 className="pl-3 text-xl font-medium mb-1">{menu.label}</h2>
                              <Controller
                                  name={menu.field as keyof User}
                                  control={control}
                                  render={({ field }) => (
                                      <Select
                                          value={field.value}
                                          onValueChange={field.onChange}
                                          disabled={!isEditing}
                                      >
                                          <SelectTrigger
                                              className="w-full border border-muted-foreground rounded-md disabled:opacity-100 disabled:border-background disabled:shadow-none"
                                          >
                                              <SelectValue placeholder={menu.placeholder} />
                                              {isEditing && <CaretSortIcon className="h-4 w-4 opacity-50" />}
                                          </SelectTrigger>
                                          <SelectContent>
                                              {menu.options.map(option => (
                                                  <SelectItem key={option} value={option}>
                                                      {option}
                                                  </SelectItem>
                                              ))}
                                          </SelectContent>
                                      </Select>
                                  )}
                              />
                          </div>
                        </div>
                    ))}
                  </CardContent>
                  <div className="flex justify-center my-5">
                    {isEditing ? (
                        <div className="flex gap-4">
                          <Button
                              onClick={() => {
                                reset(user);
                                setIsEditing(false);
                              }}
                              className="font-semibold py-3 px-8 rounded-md transition"
                          >
                            취소하기
                          </Button>
                          <Button
                              type="submit"
                              className="font-semibold py-3 px-8 rounded-md transition"
                          >
                            저장하기
                          </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="font-semibold py-3 px-8 rounded-md transition"
                        >
                          수정하기
                        </Button>
                    )}
                  </div>
                </form>
              </Card>
              <Toaster />
            </div>
        )}
      </>
  );
}
