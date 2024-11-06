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
import { z } from 'zod';
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

export default function MyProfile() {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const emailSchema = z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' });
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<User | null>(user);
  const [, setErrors] = useState<{ [key: string]: string }>({});
  const handleInputChange = (field: keyof User, value: string) => {
    dispatch(updateUserInfo({ ...user!, [field]: value }));
    // 유효성 검사
    if (field === 'email') {
      try {
        emailSchema.parse(value);
        setErrors(prev => ({ ...prev, email: '' }));
      } catch (e) {
        if (e instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, email: e.errors[0].message }));
        }
      }
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(
        updateUserInfo({ ...user!, profileImageUrl: URL.createObjectURL(e.target.files[0]) }),
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
    setFormData(user);
  }, [user]);
  return (
    <>
      {formData && (
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
                  <AvatarImage src={formData.profileImageUrl} alt="profile" />
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
                    value={formData.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    className={`text-xl p-2 w-full h-10 text-center border border-muted-foreground rounded-md font-bold placeholder:font-normal`}
                    placeholder="username"
                  />
                ) : (
                  <p className="h-10 relative top-[5.7px] md:top-[1.3px] w-full text-2xl md:text-3xl font-bold border border-background  text-center">
                    {formData.username}
                  </p>
                )}
                {isEditing ? (
                  <Input
                    type="text"
                    value={formData.bio}
                    onChange={e => handleInputChange('bio', e.target.value)}
                    className={`${
                      isEditing ? 'text-sm' : 'text-sm md:text-md'
                    } p-2 w-full h-9 text-center border border-muted-foreground rounded-md`}
                    placeholder="bio"
                  />
                ) : (
                  <p className="h-9 w-full p-2 relative -top-[0.4px] text-sm border border-background content-center text-center">
                    {formData.bio}
                  </p>
                )}
              </div>
            </CardHeader>
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
                      value={formData[field as keyof typeof formData] as string}
                      onChange={e =>
                        handleInputChange(field as keyof typeof formData, e.target.value)
                      }
                      className="w-full p-3 border border-muted-foreground rounded-md text-sm disabled:opacity-100 disabled:border-background disabled:shadow-none"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))}
              {SELECT_MENUS.map(menu => (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="pl-3 text-xl font-medium mb-1">{menu.label}</h2>
                    <Select
                      value={formData[menu.field] as string}
                      onValueChange={value => handleInputChange(menu.field, value)}
                    >
                      <SelectTrigger
                        className="w-full border border-muted-foreground rounded-md disabled:opacity-100 disabled:border-background disabled:shadow-none"
                        disabled={!isEditing}
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
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="flex justify-center my-5">
              {isEditing ? (
                <div className="flex gap-4">
                  <Button
                    onClick={() => setIsEditing(prev => !prev)}
                    className="font-semibold py-3 px-8 rounded-md transition"
                  >
                    취소하기
                  </Button>
                  <Button
                    onClick={() => setIsEditing(prev => !prev)}
                    className="font-semibold py-3 px-8 rounded-md transition"
                  >
                    저장하기
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(prev => !prev)}
                  className="font-semibold py-3 px-8 rounded-md transition"
                >
                  수정하기
                </Button>
              )}
            </div>
          </Card>
          <Toaster />
        </div>
      )}
    </>
  );
}
