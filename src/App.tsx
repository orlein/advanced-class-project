import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';
import AuthContextProvider from './contexts/AuthContext.tsx';
import { LeftSideBar } from './components/LeftSideBar.tsx';

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SidebarProvider>
          <div className='flex w-screen'>
            <Header />
            <LeftSideBar />
            <section className='flex-1 mt-16'>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
