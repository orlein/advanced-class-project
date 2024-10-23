import { Button } from '@/components/ui/button';
import SocialLoginButton from '@/components/ui/socialLoginButton';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useRef, useState, FormEvent } from 'react';
import { SignInPageInput } from './ui/customUI/signInPageInput';

const ICON_STYLE = 'size-5 text-secondary-foreground';
const EYE_ICON = 'absolute top-1/2 -translate-y-1/2 right-5';

interface TabProp {
  currentTab: string;
}
export default function SignInForm({ currentTab }: TabProp) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 입력값 유효성 검사 필요
    // currentTab === 'Sign in' ➡ 로그인 요청
    // currentTab === 'Password' ➡ 비밀번호 리셋 링크 메일 전송 요청
  };
  return (
    <article className='flex flex-col items-center justify-center gap-7 h-full'>
      <form
        className='flex flex-col items-center gap-5 w-full'
        onSubmit={handleSubmit}
      >
        <SignInPageInput
          icon={User}
          type='email'
          name='email'
          placeholder='이메일을 입력해주세요.'
          ref={emailRef}
        />
        {currentTab === 'Sign in' && (
          <>
            <div className='relative'>
              <SignInPageInput
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='비밀번호를 입력해주세요.'
                ref={passwordRef}
              />
              <button
                type='button'
                className={EYE_ICON}
                onClick={handlePassword}
              >
                {!showPassword ? (
                  <Eye className={ICON_STYLE} />
                ) : (
                  <EyeOff className={ICON_STYLE} />
                )}
              </button>
            </div>
          </>
        )}
        <Button type='submit' className='w-full'>
          {currentTab === 'Sign in' ? '로그인' : '비밀번호 찾기'}
        </Button>
      </form>
      {currentTab === 'Sign in' && (
        <>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
          <section className='flex gap-5'>
            <SocialLoginButton url='src/assets/Kakao.png' alt='카카오' />
            <SocialLoginButton url='src/assets/Naver.png' alt='네이버' />
            <SocialLoginButton url='src/assets/Google.png' alt='구글' />
          </section>
        </>
      )}
    </article>
  );
}
