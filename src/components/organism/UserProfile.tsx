import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Toaster } from '@/components/ui/toaster';
import ProfileImage from '@/components/molecule/ProfileImage';

const USER = {
  username: '포로리',
  bio: '나 때릴꺼야?',
  profileImageUrl: '',
  nationality: '경기도',
  tags: ['태그1', '태그2'],
};

const UserProfile = () => {
  if (!USER) return <></>;
  return (
    <>
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-xl mx-auto shadow-lg flex flex-col items-center gap-5 relative p-6">
          <section className="w-full flex flex-col justify-center items-center gap-5">
            <ProfileImage url={USER.profileImageUrl} variant="profile" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-bold">{USER.username}</p>
              <p className="text-sm">{USER.bio}</p>
            </div>
            {USER.nationality && (
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">지역</p>
                <p>{USER.nationality}</p>
              </div>
            )}
            {USER.tags && (
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold">관심사</p>
                <div className="grid grid-cols-2 gap-2">
                  {USER.tags.map(tag => (
                    <Button variant="outline">{tag}</Button>
                  ))}
                </div>
              </div>
            )}
          </section>
          <div className="mt-5 flex gap-3">
            <Button>메세지 보내기</Button>
            <Button>차단하기</Button>
          </div>
        </Card>
        <Toaster />
      </div>
    </>
  );
};

export default UserProfile;
