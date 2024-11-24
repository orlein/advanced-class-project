import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2 } from 'lucide-react';

const ProfileImage = ({
  url,
  variant,
  setProfileImage,
  isEditing,
}: {
  url: string | undefined;
  variant: 'sidebar' | 'challenge' | 'list' | 'post' | 'myProfile' | 'userProfile';
  setProfileImage?: Dispatch<SetStateAction<string>>;
  isEditing?: boolean;
}) => {
  const STYLE =
    variant === 'sidebar'
      ? 'size-8 rounded-lg'
      : variant === 'challenge'
      ? 'size-8 rounded-full'
      : variant === 'list'
      ? 'size-9 rounded-full'
      : variant === 'post'
      ? 'size-10 rounded-full'
      : variant === 'myProfile'
      ? 'size-48 rounded-full'
      : 'size-40 rounded-full';
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  return (
    <Avatar className={STYLE}>
      {variant === 'myProfile' && isEditing && setProfileImage && (
        <div
          className="relative"
          onMouseOver={() => setShowDeleteOption(true)}
          onMouseLeave={() => setShowDeleteOption(false)}
        >
          <AvatarImage src={url} alt="profile" className="object-cover" />
          {showDeleteOption && (
            <div className="absolute top-0 left-0 bg-zinc-950 bg-opacity-30 size-48 text-center content-center">
              <p className="cursor-pointer text-sm font-bold" onClick={() => setProfileImage('')}>
                삭제
              </p>
            </div>
          )}
        </div>
      )}
      {(variant !== 'myProfile' || !isEditing) && (
        <AvatarImage src={url} alt="profile" className="object-cover" />
      )}
      <AvatarFallback className={STYLE}>
        <User2 className="size-full text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
