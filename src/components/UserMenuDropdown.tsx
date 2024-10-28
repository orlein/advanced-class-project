import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Profile from '../assets/profile.jpg';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
// import DropdownMenuItemContent from './ui/customUI/dropdown-menu-item';
import { SidebarMenuButton, useSidebar } from './ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWideScreen } from '@/hooks/use-wideScreen';

const dropdownMenuItems = [
  { title: '나의 프로필', icon: User, url: 'my-profile', divider: true },
  { title: '로그아웃', icon: LogOut, url: '/', divider: false },
];

interface SetDropdownOpen {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenuDropdown({ setDropdownOpen }: SetDropdownOpen) {
  const navigate = useNavigate();
  const { setOpen, setOpenMobile } = useSidebar();
  const isWideScreen = useWideScreen();
  const { setUser } = useAuthContext();
  const handleClick = (title: string, url?: string) => {
    title === '로그아웃' && setUser(false);
    url && navigate(url);
    setDropdownOpen(false);
    setOpen(isWideScreen);
    setOpenMobile(false);
  };
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
          {dropdownMenuItems &&
            dropdownMenuItems.map((item) => (
              <li key={item.title} className='list-none'>
                <SidebarMenuButton
                  onClick={() => handleClick(item.title, item.url && item.url)}
                  className='hover:bg-accent hover:text-accent-foreground'
                >
                  <item.icon />
                  <p>{item.title}</p>
                </SidebarMenuButton>
                {item.divider && <DropdownMenuSeparator />}
              </li>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </>
  );
}
