import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import SignInFormField from '@/components/SignInFormField';

export default function SignIn() {
  const [currentTab, setCurrentTab] = useState<
    'Sign in' | 'Email' | 'Password'
  >('Sign in');
  const handleCurrentTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(
      e.currentTarget.innerText as 'Sign in' | 'Email' | 'Password'
    );
  };
  return (
    <>
      <div className='flex justify-center items-center h-full'>
        <Tabs
          defaultValue='sign-in'
          className='flex flex-col items-center w-full max-w-[500px] px-2 min-h-[450px]'
        >
          <TabsList className='mb-5 grid w-full grid-cols-3'>
            <TabsTrigger value='sign-in' onClick={handleCurrentTab}>
              Sign in
            </TabsTrigger>
            <TabsTrigger value='email' onClick={handleCurrentTab}>
              Email
            </TabsTrigger>
            <TabsTrigger value='password' onClick={handleCurrentTab}>
              Password
            </TabsTrigger>
          </TabsList>
          <section className='w-full'>
            <TabsContent value='sign-in'>
              <SignInFormField currentTab={currentTab} />
            </TabsContent>
            <TabsContent value='email'>
              <SignInFormField currentTab={currentTab} />
            </TabsContent>
            <TabsContent value='password'>
              <SignInFormField currentTab={currentTab} />
            </TabsContent>
          </section>
        </Tabs>
      </div>
    </>
  );
}
