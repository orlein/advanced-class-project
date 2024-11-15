import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2 } from 'lucide-react';

const ProfileImage = ({ url, size }: { url: string; size: string }) => {
  return (
    <Avatar className={`size-${size} rounded-full`}>
      <AvatarImage src={url} alt="profile" className="object-cover" />
      <AvatarFallback className="rounded-full">
        <User2 className="size-full text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
