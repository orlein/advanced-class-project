import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import LeftSideBar from './components/LeftSideBar.tsx';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';
import { useState } from 'react';
import AuthContextProvider from './contexts/AuthContext.tsx';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SidebarProvider>
          <div className='flex w-screen'>
            <Header />
            <section className={`${isSidebarOpen ? 'w-64' : 'w-16'}`}>
              <LeftSideBar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </section>
            <section className='flex-1 p-6 mt-16 flex-grow'>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
