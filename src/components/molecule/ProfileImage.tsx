import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2 } from 'lucide-react';

const ProfileImage = ({
  url,
  variant,
}: {
  url: string | undefined;
  variant: 'sidebar' | 'post' | 'profile';
}) => {
  const STYLE =
    variant === 'sidebar'
      ? 'size-8 rounded-lg'
      : variant === 'post'
      ? 'size-10 rounded-full'
      : 'size-48 rounded-full';
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
