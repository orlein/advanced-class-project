import { Laptop, LogOut, LucideProps, Moon, Sun, User } from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ComponentType<LucideProps>;
  url?: string;
  divider?: boolean;
  subContent?: ThemeOptions[];
}

interface ThemeMenu {
  title: '테마 변경';
  icon: React.ComponentType<LucideProps>;
  subContent: ThemeOptions[];
}
interface ThemeOptions {
  title: string;
  icon: React.ComponentType<LucideProps>;
  value: string;
}

export const THEME_OPTIONS: ThemeOptions[] = [
  { title: '라이트 모드', icon: Sun, value: 'light' },
  { title: '다크 모드', icon: Moon, value: 'dark' },
  { title: '시스템 설정', icon: Laptop, value: 'system' },
] as const;

export const THEME_MENU: ThemeMenu = {
  title: '테마 변경',
  icon: Sun,
  subContent: [...THEME_OPTIONS],
} as const;

export const DROPDOWN_MENU_ITEMS: MenuItem[] = [
  { title: '나의 프로필', icon: User, url: 'my-profile', divider: true },
  THEME_MENU,
  { title: '로그아웃', icon: LogOut, url: '/', divider: false },
] as const;
