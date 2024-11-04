import { THEME_MENU } from '@/util/dropdownOptions';
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/dropdown-menu';
import { useTheme, Theme } from '@/components/theme-provider';
import { SidebarMenuButton } from './ui/sidebar';

export default function ThemeMenu({
  isInFooter = false,
}: {
  isInFooter?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {isInFooter ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton asChild>
              <div className='hover:bg-accent hover:text-accent-foreground'>
                <THEME_MENU.icon />
                <span>{THEME_MENU.title}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>{' '}
          <DropdownMenuContent side='top' align='start'>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
            >
              {THEME_MENU.subContent.map((option) => (
                <DropdownMenuRadioItem
                  key={option.title}
                  value={option.value}
                  className='pr-5'
                >
                  <option.icon className='mr-2 h-4 w-4' />
                  <span>{option.title}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='h-10'>
            <THEME_MENU.icon className='mr-2 h-4 w-4' />
            <span>{THEME_MENU.title}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
            >
              {THEME_MENU.subContent.map((option) => (
                <DropdownMenuRadioItem
                  key={option.title}
                  value={option.value}
                  className='pr-5'
                >
                  <option.icon className='mr-2 h-4 w-4' />
                  <span>{option.title}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )}
    </>
  );
}
