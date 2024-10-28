import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';
import AuthContextProvider from './contexts/AuthContext.tsx';
import { LeftSideBar } from './components/LeftSideBar.tsx';
import { useWideScreen } from './hooks/use-wideScreen.tsx';

export default function App() {
  const isWideScreen = useWideScreen();
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SidebarProvider defaultOpen={isWideScreen}>
          <div className='flex w-screen'>
            <Header />
            <LeftSideBar />
            <section className='flex-1 sm:p-10 mt-16'>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
