import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from './components/molecule/Header.tsx';
import { LeftSideBar } from './components/organism/LeftSideBar.tsx';
import { useWideScreen } from './hooks/use-wideScreen.tsx';
import { store } from './RTK/store.ts';
import { Provider } from 'react-redux';
import { useIsMobile } from './hooks/use-mobile.tsx';

export default function App() {
  const isWideScreen = useWideScreen();
  const isMobile = useIsMobile();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SidebarProvider defaultOpen={isWideScreen}>
          <div className="flex w-screen">
            {isMobile && <Header />}
            <LeftSideBar />
            <section className={`flex-1 p-8 sm:p-10 ${isMobile && 'mt-16'}`}>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Provider>
  );
}
