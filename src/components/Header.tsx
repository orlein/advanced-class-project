import { CircleUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserMenuDropdown from './UserMenuDropdown';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Header() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  return (
    <header className='bg-background w-screen fixed top-0 left-0 h-16 z-40 border-b flex items-center'>
      <section className='w-fit m-auto'>
        <h1 className='text-4xl cursor-pointer' onClick={() => navigate('/')}>
          원정대
        </h1>
      </section>
      <section className='absolute top-1/2 right-5 -translate-y-1/2 flex items-center'>
        <button
          className='text-xs w-16 h-10 mr-4 border rounded-xl bg-secondary'
          onClick={() => setUser((prev) => !prev)}
        >
          임시 로그인 토글 버튼
        </button>
        {!user && (
          <CircleUser
            className='cursor-pointer'
            size={32}
            strokeWidth={1}
            onClick={() => navigate('/sign-in')}
          />
        )}
        {user && <UserMenuDropdown />}
      </section>
    </header>
  );
}
