import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  ChevronDown,
  ChevronsUpDown,
  HomeIcon,
  ListTodo,
  LogIn,
  MessageSquareIcon,
  NotebookText,
  SettingsIcon,
  Swords,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import Profile from '../assets/profile.jpg';
import { useWideScreen } from '@/hooks/use-wideScreen';
import UserMenuDropdown from './UserMenuDropdown';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const menuItems = [
  { title: '홈', icon: HomeIcon, url: '/' },
  {
    title: '챌린지',
    icon: Swords,
    collapsible: [
      { title: '전체 챌린지', url: '/challenges' },
      { title: '우수 챌린지', url: '/challenges/top' },
      { title: '새로운 챌린지 만들기', url: '/challenges/new' },
      { title: '챌린지 성공 랭킹', url: '/challenges/success-users' },
    ],
  },
  {
    title: '나의 챌린지',
    icon: ListTodo,
    collapsible: [
      { title: '나의 챌린지', url: '/my-challenges' },
      { title: '나의 챌린지 이벤트', url: '/my-events' },
    ],
  },
  {
    title: '글 관리',
    icon: NotebookText,
    collapsible: [
      { title: '전체 글 보기', url: '/posts' },
      { title: '인기글', url: '/posts/sort/likes' },
      { title: '새 글 작성', url: '/posts/new' },
    ],
  },
  {
    title: '메시징',
    icon: MessageSquareIcon,
    collapsible: [
      { title: '메시지 채널', url: '/message-channels' },
      { title: '챌린지 메세지 채널', url: '/message-channels/challenges' },
    ],
  },
  {
    title: '설정',
    icon: SettingsIcon,
    collapsible: [
      { title: '알림 설정', url: '/settings/notifications' },
      { title: '쿠키 설정', url: '/settings/cookie' },
      { title: '커스터마이징', url: '/settings/customization' },
      { title: '차단 유저 관리', url: '/settings/block-users' },
      { title: '프로필 공개 설정', url: '/settings/private-account' },
    ],
  },
];

export function LeftSideBar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const isWideScreen = useWideScreen();
  const { open, setOpen, setOpenMobile, isMobile } = useSidebar();
  const [openIndices, setOpenIndices] = useState<boolean[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const handleIconClick = (index?: number) => {
    if (!open) setOpen(true);
    setOpenIndices((prevState) => {
      const newState = [...prevState];
      if (index) newState[index] = !newState[index];
      return newState;
    });
  };
  const handleMenuClick = (url: string) => {
    navigate(url);
    !isMobile && setOpen(isWideScreen);
    isMobile && setOpenMobile(false);
    if (!isWideScreen) setOpenIndices([]);
  };
  return (
    <Sidebar collapsible='icon' className='z-50'>
      <SidebarHeader className='h-16 justify-center bg-background'>
        <SidebarMenuItem className='p-0.5'>
          <SidebarTrigger onClick={() => setOpenIndices([])} />
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className='bg-background'>
        {menuItems.map((item, index) => (
          <SidebarMenuItem key={item.title}>
            {item.collapsible && (
              <Collapsible
                defaultOpen={false}
                open={openIndices[index] || false}
                onOpenChange={() => handleIconClick(index)}
                className='group/collapsible'
              >
                <SidebarGroup>
                  <CollapsibleTrigger>
                    <SidebarMenuButton asChild>
                      <div className='hover:bg-accent hover:text-accent-foreground'>
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.collapsible.map((item, itemIndex) => (
                        <SidebarMenuSubItem key={itemIndex}>
                          <SidebarMenuSubButton asChild>
                            <div
                              className='block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground'
                              onClick={() => handleMenuClick(item.url)}
                            >
                              {item.title}
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            )}
            {!item.collapsible && (
              <SidebarGroup>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => handleMenuClick(item.url)}
                    className='hover:bg-accent hover:text-accent-foreground'
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarGroup>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter className='bg-background'>
        <SidebarMenu>
          {!user && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div
                  onClick={() => handleMenuClick('/sign-in')}
                  className='hover:bg-accent hover:text-accent-foreground'
                >
                  <LogIn />
                  <span>로그인</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {user && (
            <SidebarMenuItem>
              <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  onClick={() => handleIconClick()}
                >
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={Profile} alt='profile' />
                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                  </Avatar>
                  <DropdownMenuTrigger asChild>
                    <div className='flex items-center justify-between w-full'>
                      <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>username</span>
                        <span className='truncate text-xs'>
                          username@username.com
                        </span>
                      </div>
                      <ChevronsUpDown className='ml-auto size-4' />
                    </div>
                  </DropdownMenuTrigger>
                </SidebarMenuButton>
                <UserMenuDropdown setDropdownOpen={setDropdownOpen} />
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
