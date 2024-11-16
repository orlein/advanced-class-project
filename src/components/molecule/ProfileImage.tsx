import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2 } from 'lucide-react';

const ProfileImage = ({
  url,
  variant,
}: {
  url: string | undefined;
  variant: 'sidebar' | 'list' | 'post' | 'myProfile' | 'userProfile';
}) => {
  const STYLE =
    variant === 'sidebar'
      ? 'size-8 rounded-lg'
      : variant === 'list'
      ? 'size-9 rounded-full'
      : variant === 'post'
      ? 'size-10 rounded-full'
      : variant === 'myProfile'
      ? 'size-48 rounded-full'
      : 'size-40 rounded-full';
  return (
    <Avatar className={STYLE}>
      <AvatarImage src={url} alt="profile" className="object-cover" />
      <AvatarFallback className="rounded-full">
        <User2 className="size-full text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
