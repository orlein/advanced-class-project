import {
  HomeIcon,
  ListTodo,
  LucideProps,
  MessageSquareIcon,
  NotebookText,
  SettingsIcon,
  Swords,
} from 'lucide-react';
import React from 'react';

interface MenuItems {
  title: string;
  icon: React.ComponentType<LucideProps>;
  url?: string;
  collapsible?: { title: string; url: string }[];
}

export const MENU_ITEMS: MenuItems[] = [
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
] as const;
