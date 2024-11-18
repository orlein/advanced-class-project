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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, ChevronsUpDown, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { useWideScreen } from '@/hooks/use-wideScreen';
import UserMenuDropdown from './UserMenuDropdown';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import ThemeMenu from './ThemeMenu';
import { MENU_ITEMS } from '@/constants/sidebarMenuItems';
import ProfileImage from '../molecule/ProfileImage';
import { ScrollArea } from '../ui/scroll-area';
import { useGetUserInfoQuery } from '@/api/accountApi';

export const LeftSideBar = memo(() => {
  const navigate = useNavigate();
  const isWideScreen = useWideScreen();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const { data: user, refetch } = useGetUserInfoQuery(undefined, { skip: !isSignedIn });
  const { open, setOpen, setOpenMobile, isMobile } = useSidebar();
  const [openIndices, setOpenIndices] = useState<boolean[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const handleIconClick = (index?: number) => {
    if (!open) setOpen(true);
    setOpenIndices(prevState => {
      const newState = [...prevState];
      if (index !== undefined) newState[index] = !newState[index];
      return newState;
    });
  };
  const handleMenuClick = (url: string) => {
    navigate(url);
    if (!isMobile) {
      setOpen(isWideScreen);
    } else {
      setOpenMobile(false);
    }
    if (!isWideScreen) setOpenIndices([]);
  };
  useEffect(() => {
    if (isSignedIn) refetch();
  }, [isSignedIn]);
  return (
    <Sidebar collapsible="icon" className="z-50">
      <SidebarHeader className="h-16 justify-center bg-background">
        <SidebarMenuItem className="p-0.5">
          <SidebarTrigger onClick={() => setOpenIndices([])} />
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <ScrollArea>
          {MENU_ITEMS.map((item, index) => (
            <SidebarMenuItem key={item.title}>
              {item.collapsible && (
                <Collapsible
                  defaultOpen={false}
                  open={openIndices[index] || false}
                  onOpenChange={() => handleIconClick(index)}
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <CollapsibleTrigger>
                      <SidebarMenuButton asChild>
                        <div className="hover:bg-accent hover:text-accent-foreground">
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.collapsible.map((subItem, subIndex) => (
                          <SidebarMenuSubItem key={subIndex}>
                            <SidebarMenuSubButton asChild>
                              <div
                                className="block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                                onClick={() => handleMenuClick(subItem.url)}
                              >
                                {subItem.title}
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
                      onClick={() => handleMenuClick(item.url!)}
                      className="hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarGroup>
              )}
            </SidebarMenuItem>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <SidebarMenu>
          {!isSignedIn && (
            <>
              {/* 테마 변경 메뉴 */}
              <SidebarMenuItem>
                <ThemeMenu isInFooter={true} />
              </SidebarMenuItem>
              {/* 로그인 메뉴 */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => handleMenuClick('/sign-in')}
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    <LogIn />
                    <span>로그인</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
          {isSignedIn && user && (
            <SidebarMenuItem>
              <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  onClick={() => handleIconClick()}
                >
                  <ProfileImage url={user.profileImageUrl} variant="sidebar" />
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between w-full">
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.username}</span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
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
});
