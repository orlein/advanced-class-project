import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/RTK/store';
import { useSidebar } from '../ui/sidebar';
import { useWideScreen } from '@/hooks/use-wideScreen';
import { DROPDOWN_MENU_ITEMS } from '@/constants/dropdownOptions';
import ThemeMenu from './ThemeMenu';
import authSlice from '@/RTK/slice';
import { useGetUserInfoQuery } from '@/api/accountApi';
import { useEffect, useState } from 'react';
import { UserInfoOnSidebarData } from '@/types/userData';
import ProfileImage from '../molecule/ProfileImage';

interface SetDropdownOpen {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenuDropdown({ setDropdownOpen }: SetDropdownOpen) {
  const navigate = useNavigate();
  const { setOpen, setOpenMobile } = useSidebar();
  const isWideScreen = useWideScreen();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserInfoOnSidebarData>();
  const { data, isLoading } = useGetUserInfoQuery();

  const handleClick = (title: string, url?: string) => {
    if (title === '로그아웃') {
      dispatch(authSlice.actions.clearUser());
    }
    if (url) {
      navigate(url);
    }
    setDropdownOpen(false);
    setOpen(isWideScreen);
    setOpenMobile(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      const { email, username, profileImageUrl } = data;
      setUser({ email, username, profileImageUrl });
    }
  }, [data, isLoading]);

  if (!user) return <></>;
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-l relative bottom-2"
      side="bottom"
      align="end"
      sideOffset={4}
      aria-label="사용자 메뉴"
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm h-14">
          <ProfileImage url={user.profileImageUrl} size="small" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.username}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {DROPDOWN_MENU_ITEMS.map(item =>
          item.url ? (
            <DropdownMenuItem
              key={item.title}
              onClick={() => handleClick(item.title, item.url)}
              className="hover:bg-accent hover:text-accent-foreground h-10"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ) : (
            <ThemeMenu key={item.title} />
          ),
        )}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
