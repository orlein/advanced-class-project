import ProfileImage from '@/components/molecule/ProfileImage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import UserProfile from '@/components/organism/UserProfile';

type BlockedUser = { username: string; profileImageUrl: string; email: string };
type BlockedList = BlockedUser[];

const BLOCKED_USERS_DUMMY_DATA: BlockedList = [
  { username: '차단유저1', profileImageUrl: '', email: 'email_1@email.com' },
  { username: '차단유저2', profileImageUrl: '', email: 'email_2@email.com' },
  { username: '차단유저3', profileImageUrl: '', email: 'email_3@email.com' },
  { username: '차단유저4', profileImageUrl: '', email: 'email_4@email.com' },
  { username: '차단유저5', profileImageUrl: '', email: 'email_5@email.com' },
  { username: '차단유저6', profileImageUrl: '', email: 'email_6@email.com' },
];
export default function BlockUsersSetting() {
  const { toast } = useToast();
  const [blockedList, setBlockedList] = useState<BlockedList | []>(BLOCKED_USERS_DUMMY_DATA);
  const handleUnblock = (blockedUser: string) => {
    setBlockedList(prev => prev.filter(user => user.username !== blockedUser));
    toast({
      description: `${blockedUser}님을 차단 해제하였습니다.`,
      duration: 1000,
    });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-10">
      <Card className="flex flex-col gap-3 w-full max-w-lg p-5">
        <CardTitle>차단된 사용자</CardTitle>
        <Separator />
        {blockedList.length === 0 && <p className="text-sm">차단된 사용자가 없습니다.</p>}
        {blockedList.length > 0 &&
          blockedList.map(blockedUser => (
            <div key={blockedUser.email} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ProfileImage url={blockedUser.profileImageUrl} variant="list" />
                <p className="text-sm">{blockedUser.username}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">차단해제</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm flex flex-col justify-center sm:max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {blockedUser.username}님의 차단을 해제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <p>차단을 해제하면 해당 사용자와 다시 소통할 수 있습니다.</p>
                      <p>정말 해제하시겠습니까?</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row items-end justify-center gap-2">
                    <AlertDialogCancel className="max-w-24">취소</AlertDialogCancel>
                    <AlertDialogAction
                      className="max-w-24"
                      onClick={() => handleUnblock(blockedUser.username)}
                    >
                      확인
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
      </Card>

      <UserProfile />
      <Toaster />
    </section>
  );
}
