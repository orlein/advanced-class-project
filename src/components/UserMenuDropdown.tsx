import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileTextIcon, LogOut, MessageSquare, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DropdownMenuItemContent from './ui/customUI/dropdown-menu-item';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserMenuDropdown() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-0'>
          <Avatar className='flex justify-center items-center size-9 rounded-full overflow-hidden'>
            <AvatarImage src='src/assets/profile.jpg' alt='@shadcn' />
            <AvatarFallback>username</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-80 mr-5'>
          <DropdownMenuLabel className='flex gap-3 items-center h-20'>
            <Avatar className='flex justify-center items-center size-12 rounded-full overflow-hidden'>
              <AvatarImage src='src/assets/profile.jpg' alt='@shadcn' />
              <AvatarFallback>username</AvatarFallback>
            </Avatar>
            <section className='flex flex-col gap-1'>
              <p className='text-lg'>username</p>
              <p>user-email-id@google.com</p>
            </section>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/my-profile')}>
            <DropdownMenuItemContent icon={User} text='나의 프로필' />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/my-challenges')}>
            <DropdownMenuItemContent icon={FileTextIcon} text='나의 챌린지' />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/my-events')}>
            <DropdownMenuItemContent
              icon={FileTextIcon}
              text='나의 챌린지 이벤트'
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/message-channels')}>
            <DropdownMenuItemContent
              icon={MessageSquare}
              text='나의 메시지 채널'
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUser((prev) => !prev)}>
            <DropdownMenuItemContent icon={LogOut} text='로그아웃' />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
