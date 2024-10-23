import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from './ui/sidebar.tsx';
import { FileTextIcon, HomeIcon, UserIcon, SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeftSideBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChallengesOpen, setIsChallengesOpen] = useState(false);
  const [isMyEventsOpen, setIsMyEventsOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarMenu className='mt-5'>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => navigate('/')}>
            <HomeIcon className='mr-2' />홈
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => navigate('/my-profile')}>
            <UserIcon className='mr-2' />
            프로필
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setIsChallengesOpen(!isChallengesOpen)}
          >
            <FileTextIcon className='mr-2' />
            챌린지
          </SidebarMenuButton>
          {isChallengesOpen && (
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton onClick={() => navigate('/challenges')}>
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
              {/* <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  onClick={() => navigate('/my-challenges/completed')}
                >
                  내가 완료한 챌린지 목록
                </SidebarMenuSubButton>
              </SidebarMenuSubItem> */}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setIsMyEventsOpen(!isMyEventsOpen)}>
            <FileTextIcon className='mr-2' />
            나의 챌린지 이벤트
          </SidebarMenuButton>
          {isMyEventsOpen && (
            <SidebarMenuSub>
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
            <FileTextIcon className='mr-2' />글 관리
          </SidebarMenuButton>
          {isPostsOpen && (
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton onClick={() => navigate('/posts')}>
                  글 목록
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton onClick={() => navigate('/posts/new')}>
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
            <FileTextIcon className='mr-2' />
            메시징
          </SidebarMenuButton>
          {isMessagingOpen && (
            <SidebarMenuSub>
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
          <SidebarMenuButton onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <SettingsIcon className='mr-2' />
            설정
          </SidebarMenuButton>
          {isSettingsOpen && (
            <SidebarMenuSub>
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

        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => navigate('/sign-in')}>
            로그인
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => navigate('/sign-up')}>
            회원가입
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  );
}
