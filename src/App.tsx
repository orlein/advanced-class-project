import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import LeftSideBar from './components/LeftSideBar.tsx';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className='flex h-screen'>
          <LeftSideBar />
          <div className='flex-1 p-4'>
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
