import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.tsx';
import { LeftSideBar } from './components/LeftSideBar.tsx';
import { useWideScreen } from './hooks/use-wideScreen.tsx';
import { store } from './RTK/store.ts';
import { Provider } from 'react-redux';

export default function App() {
  const isWideScreen = useWideScreen();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SidebarProvider defaultOpen={isWideScreen}>
          <div className='flex w-screen'>
            <Header />
            <LeftSideBar />
            <section className='flex-1 p-8 sm:p-10 mt-16'>
              <Outlet />
            </section>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Provider>
  );
}
