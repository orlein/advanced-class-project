import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '../ui/sidebar';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-background w-screen fixed top-0 left-0 h-16 z-40 border-b flex items-center justify-center">
      <div className="absolute top-1/2 -translate-y-1/2 left-1 inline-flex items-center justify-center p-2.5">
        <SidebarTrigger />
      </div>
      <section className="w-fit m-auto">
        <h1 className="text-4xl cursor-pointer" onClick={() => navigate('/')}>
          원정대
        </h1>
      </section>
    </header>
  );
}
