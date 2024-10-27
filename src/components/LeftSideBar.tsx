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
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import {
  ChevronDown,
  HomeIcon,
  ListTodo,
  LogIn,
  MessageSquareIcon,
  NotebookText,
  SettingsIcon,
  Swords,
  UserIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

const menuItems = [
  { title: '홈', icon: HomeIcon, url: '/' },
  { title: '프로필', icon: UserIcon, url: '/my-profile' },
  {
    title: '챌린지',
    icon: Swords,
    collapsible: [
      { title: '전체 챌린지', url: '/challenges' },
      { title: '새로운 챌린지 생성', url: '/challenges/new' },
      { title: '우수 챌린지', url: '/challenges/top' },
      { title: '챌린지 성공한 유저', url: '/challenges/success-users' },
      { title: '나의 챌린지', url: '/my-challenges' },
    ],
  },
  {
    title: '나의 챌린지 이벤트',
    icon: ListTodo,
    collapsible: [
      { title: '참여 중인 챌린지 이벤트', url: '/my-events/upcoming' },
      { title: '완료한 챌린지 이벤트', url: '/my-events/completed' },
      { title: '실패한 챌린지 이벤트', url: '/my-events/failed' },
    ],
  },
  {
    title: '글 관리',
    icon: NotebookText,
    collapsible: [
      { title: '글 목록', url: '/posts' },
      { title: '새 글 작성', url: '/posts/new' },
      { title: '인기글', url: '/posts/sort/likes' },
    ],
  },
  {
    title: '메시징',
    icon: MessageSquareIcon,
    collapsible: [
      { title: '메시지 채널', url: '/message-channels' },
      { title: '챌린지 채팅방', url: '/message-channels/challenges' },
    ],
  },
  {
    title: '설정',
    icon: SettingsIcon,
    collapsible: [
      { title: '이메일 찾기', url: '/account/find-email' },
      { title: '비밀번호 재설정', url: '/account/reset-password' },
      { title: '알림 설정', url: '/settings/notifications' },
      { title: '테마 설정', url: '/settings/appearances' },
      { title: 'UI 커스터마이징', url: '/settings/customization' },
      { title: '쿠키 설정', url: '/settings/cookie' },
      { title: '차단 관리', url: '/settings/block-users' },
      { title: '프로필 비공개 관리', url: '/settings/private-account' },
    ],
  },
];

export function LeftSideBar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { open, setOpen, setOpenMobile } = useSidebar();
  const [openIndices, setOpenIndices] = useState<boolean[]>([]);
  const handleIconClick = (index: number) => {
    if (!open) setOpen(true);
    setOpenIndices((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleMenuClick = (url: string) => {
    navigate(url);
    setOpen(false);
    setOpenMobile(false);
    setOpenIndices([]);
  };
  return (
    <Sidebar collapsible='icon' className='z-50'>
      <SidebarHeader className='h-16 justify-center bg-background'>
        <SidebarMenu>
          <SidebarMenuItem className='p-0.5'>
            <SidebarTrigger onClick={() => setOpenIndices([])} />
          </SidebarMenuItem>
        </SidebarMenu>
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
                    <SidebarMenuButton asChild tooltip={item.title}>
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
                <SidebarMenuButton asChild tooltip={item.title}>
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
            <SidebarMenuItem className=''>
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
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mb-1 ml-1'
              >
                <Avatar className='h-8 w-8 rounded-lg flex justify-center items-center'>
                  <AvatarImage src='src/assets/profile.jpg' alt='profile' />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>username</span>
                  <span className='truncate text-xs'>
                    username@username.com
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
