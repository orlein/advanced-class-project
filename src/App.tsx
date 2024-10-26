import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import LeftSideBar from './components/LeftSideBar.tsx';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';
import AuthContextProvider from './contexts/AuthContext.tsx';

export default function App() {

  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SidebarProvider>
          <div className='flex w-screen'>
            <Header />
            <section className='z-60'>
              <LeftSideBar />
            </section>
            <section className='flex-1 p-10 mt-16 flex-grow'>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
