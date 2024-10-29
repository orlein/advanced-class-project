import { LogOut, User, Moon, Sun, Laptop } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Profile from '../assets/profile.jpg';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWideScreen } from '@/hooks/use-wideScreen';
import { useTheme, Theme } from '@/components/theme-provider';

const dropdownMenuItems = [
  { title: '나의 프로필', icon: User, url: 'my-profile', divider: true },
  { title: '로그아웃', icon: LogOut, url: '/', divider: false },
];

interface SetDropdownOpen {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenuDropdown({ setDropdownOpen }: SetDropdownOpen) {
  const navigate = useNavigate();
  useWideScreen();
  const { setUser } = useAuthContext();
  const { theme, setTheme } = useTheme();

  const handleClick = (title: string, url?: string) => {
    if (title === '로그아웃') {
      setUser(false);
    }
    if (url) {
      navigate(url);
    }
    setDropdownOpen(false);
  };

  return (
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
          {dropdownMenuItems.map((item) => (
              <DropdownMenuItem
                  key={item.title}
                  onClick={() => handleClick(item.title, item.url)}
                  className='hover:bg-accent hover:text-accent-foreground'
              >
                <item.icon className='mr-2 h-4 w-4' />
                <span>{item.title}</span>
              </DropdownMenuItem>
          ))}
          {/* 테마 변경 메뉴 추가 */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className='mr-2 h-4 w-4' />
              <span>테마 변경</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                  value={theme}
                  onValueChange={(value: Theme) => setTheme(value)}
              >
                <DropdownMenuRadioItem value='light'>
                  <Sun className='mr-2 h-4 w-4' />
                  <span>라이트 모드</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='dark'>
                  <Moon className='mr-2 h-4 w-4' />
                  <span>다크 모드</span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='system'>
                  <Laptop className='mr-2 h-4 w-4' />
                  <span>시스템 설정</span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
  );
}
