import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import LeftSideBar from './components/LeftSideBar.tsx';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
      <ThemeProvider>
        <SidebarProvider>
          <div className="flex w-full">
            <LeftSideBar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 p-4">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
  );
}
