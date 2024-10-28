import { LucideProps } from 'lucide-react';
import { SidebarMenuButton, useSidebar } from '../sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useWideScreen } from '@/hooks/use-wideScreen';

interface ItemProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
  url?: string;
}

export default function DropdownMenuItemContent({
  icon: Icon,
  text,
  url,
}: ItemProps) {
  const navigate = useNavigate();
  const { setOpen, setOpenMobile } = useSidebar();
  const isWideScreen = useWideScreen();
  const { setUser } = useAuthContext();
  const handleClick = () => {
    text === '로그아웃' && setUser(false);
    url && navigate(url);
    setOpen(isWideScreen);
    setOpenMobile(false);
  };
  return (
    <SidebarMenuButton
      onClick={handleClick}
      className='hover:bg-accent hover:text-accent-foreground'
    >
      <Icon />
      <p>{text}</p>
    </SidebarMenuButton>
  );
}
