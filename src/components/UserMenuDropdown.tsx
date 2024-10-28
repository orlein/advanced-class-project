import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Profile from '../assets/profile.jpg';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import DropdownMenuItemContent from './ui/customUI/dropdown-menu-item';

export default function UserMenuDropdown() {
  return (
    <>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-l relative bottom-2'
        side='bottom'
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm h-14'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={Profile} alt='profile' />
              <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>username</span>
              <span className='truncate text-xs'>username@username.com</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItemContent
            icon={User}
            text='나의 프로필'
            url='/my-profile'
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItemContent icon={LogOut} text='로그아웃' />
      </DropdownMenuContent>
    </>
  );
}
