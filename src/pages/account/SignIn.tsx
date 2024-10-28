import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignInForm from '@/components/SignInForm';
import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

export default function SignIn() {
  const { setUser } = useAuthContext();
  const [currentTab, setCurrentTab] = useState<'Sign in' | 'Password'>(
    'Sign in'
  );
  const handleCurrentTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.innerText as 'Sign in' | 'Password');
  };
  return (
    <>
      <div className='flex justify-center items-center h-full'>
        <Tabs
          defaultValue='sign-in'
          className='flex flex-col items-center w-full max-w-[500px] px-2 min-h-[450px]'
        >
          <TabsList className='mb-5 grid w-full grid-cols-2'>
            <TabsTrigger value='sign-in' onClick={handleCurrentTab}>
              Sign in
            </TabsTrigger>
            <TabsTrigger value='password' onClick={handleCurrentTab}>
              Password
            </TabsTrigger>
          </TabsList>
          <section className='w-full'>
            <TabsContent value='sign-in'>
              <SignInForm currentTab={currentTab} />
            </TabsContent>
            <TabsContent value='password'>
              <SignInForm currentTab={currentTab} />
            </TabsContent>
          </section>
        </Tabs>
      </div>
      <section className='absolute top-1/4 -translate-y-24 left-1/2 flex items-center justify-center p-2.5'>
        <button
          className='text-xs w-16 h-10 mr-4 border rounded-xl bg-foreground text-background'
          onClick={() => setUser((prev) => !prev)}
        >
          임시 로그인 토글 버튼
        </button>
      </section>
    </>
  );
}
