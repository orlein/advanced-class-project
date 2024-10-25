import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
} from './ui/sidebar.tsx';
import {
  FileTextIcon,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  MessageSquareIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

const BUTTON_STYLE =
  'size-16 justify-start bg-transparent text-foreground hover:bg-transparent';
const MENU_SPAN_STYLE = 'relative -left-7';

export default function LeftSideBar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const [isMyEventsOpen, setIsMyEventsOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Sidebar
        className={`bg-background z-50 min-h-screen overflow-y-auto ${
          !isSidebarOpen ? 'max-w-16' : 'max-w-64'
        }`}
      >
        <SidebarHeader
          className={`size-16 flex flex-row items-center justify-center`}
        >
          <Button onClick={toggleSidebar} className={BUTTON_STYLE}>
            <HamburgerMenuIcon />
          </Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu className='flex flex-col gap-4'>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/')}>
                <Button className={BUTTON_STYLE}>
                  <HomeIcon />
                </Button>
                {isSidebarOpen && <span className={MENU_SPAN_STYLE}>홈</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/my-profile')}>
                <Button className={BUTTON_STYLE}>
                  <UserIcon />
                </Button>
                {isSidebarOpen && (
                  <span className={MENU_SPAN_STYLE}>프로필</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsChallengesOpen(!isChallengesOpen)}
              >
                <Button className={BUTTON_STYLE}>
                  <FileTextIcon />
                </Button>
                {isSidebarOpen && (
                  <span className={MENU_SPAN_STYLE}>챌린지</span>
                )}
              </SidebarMenuButton>
              {isChallengesOpen && isSidebarOpen && (
                <SidebarMenuSub className='ml-7'>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/challenges')}
                    >
                      전체 챌린지 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/challenges/new')}
                    >
                      새로운 챌린지 생성
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/challenges/top')}
                    >
                      우수 챌린지 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/challenges/success-users')}
                    >
                      챌린지 성공한 유저 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/my-challenges')}
                    >
                      나의 챌린지 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsMyEventsOpen(!isMyEventsOpen)}
              >
                <Button className={BUTTON_STYLE}>
                  <FileTextIcon />
                </Button>
                {isSidebarOpen && (
                  <span className={MENU_SPAN_STYLE}>나의 챌린지 이벤트</span>
                )}
              </SidebarMenuButton>
              {isMyEventsOpen && isSidebarOpen && (
                <SidebarMenuSub className='ml-7'>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/my-events/upcoming')}
                    >
                      참여 중인 챌린지 이벤트 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/my-events/completed')}
                    >
                      완료한 챌린지 이벤트 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/my-events/failed')}
                    >
                      실패한 챌린지 이벤트 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setIsPostsOpen(!isPostsOpen)}>
                <Button className={BUTTON_STYLE}>
                  <FileTextIcon />
                </Button>
                {isSidebarOpen && (
                  <span className={MENU_SPAN_STYLE}>글 관리</span>
                )}
              </SidebarMenuButton>
              {isPostsOpen && isSidebarOpen && (
                <SidebarMenuSub className='ml-7'>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton onClick={() => navigate('/posts')}>
                      글 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/posts/new')}
                    >
                      새 글 작성
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/posts/sort/likes')}
                    >
                      추천 수로 정렬된 글 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsMessagingOpen(!isMessagingOpen)}
              >
                <Button className={BUTTON_STYLE}>
                  <MessageSquareIcon />
                </Button>
                {isSidebarOpen && (
                  <span className={MENU_SPAN_STYLE}>메시징</span>
                )}
              </SidebarMenuButton>
              {isMessagingOpen && isSidebarOpen && (
                <SidebarMenuSub className='ml-7'>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/message-channels')}
                    >
                      메시지 채널 목록
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/message-channels/challenges')}
                    >
                      챌린지 채팅방
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              >
                <Button className={BUTTON_STYLE}>
                  <SettingsIcon />
                </Button>
                {isSidebarOpen && <span className={MENU_SPAN_STYLE}>설정</span>}
              </SidebarMenuButton>
              {isSettingsOpen && isSidebarOpen && (
                <SidebarMenuSub className='ml-7'>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/account/find-email')}
                    >
                      이메일 찾기
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/account/reset-password')}
                    >
                      비밀번호 재설정
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/notifications')}
                    >
                      알림 설정
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/appearances')}
                    >
                      테마 설정
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/customization')}
                    >
                      UI 커스터마이징
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/cookie')}
                    >
                      쿠키 설정
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/block-users')}
                    >
                      차단 관리
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      onClick={() => navigate('/settings/private-account')}
                    >
                      프로필 비공개 관리
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
