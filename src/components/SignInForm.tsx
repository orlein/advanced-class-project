import { Button } from '@/components/ui/button';
import SocialLoginButton from '@/components/ui/socialLoginButton';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useRef, useState, FormEvent } from 'react';
import { SignInPageInput } from './ui/customUI/signInPageInput';
import { SafeParseReturnType, z } from 'zod';
import { Checkbox } from './ui/checkbox';

const ICON_STYLE = 'size-5 text-secondary-foreground';
const EYE_ICON = 'absolute top-1/2 -translate-y-1/2 right-5';

const INPUT_VALIDATION = z.object({
  email: z
    .string()
    .trim()
    .nonempty('이메일 주소를 입력해주세요.')
    .email('이메일 주소를 확인해주세요.'),
  password: z
    .string()
    .trim()
    .nonempty('비밀번호를 입력해주세요.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,16}$/g,
      '비밀번호를 확인해주세요.'
    ),
  isEmailToBeSaved: z.boolean(),
});
type InputInfo = z.infer<typeof INPUT_VALIDATION>;

const SOCIAL_LOGIN_BUTTONS = {
  구글: 'src/assets/Google.png',
  카카오: 'src/assets/Kakao.png',
  네이버: 'src/assets/Naver.png',
};

interface TabProp {
  currentTab: string;
}

export default function SignInForm({ currentTab }: TabProp) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailSaveCheckRef = useRef<HTMLButtonElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = () => setShowPassword(!showPassword);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputInfo: InputInfo = {
      email: '',
      password: '',
      isEmailToBeSaved: false,
    };

    if (emailRef.current) {
      const parsedEmailInput: SafeParseReturnType<string, string> =
        INPUT_VALIDATION.shape.email.safeParse(emailRef.current.value);
      if (parsedEmailInput.success) {
        inputInfo.email = parsedEmailInput.data;
      }
    }
    if (passwordRef.current) {
      const parsedPasswordInput: SafeParseReturnType<string, string> =
        INPUT_VALIDATION.shape.password.safeParse(passwordRef.current.value);
      if (parsedPasswordInput.success) {
        inputInfo.password = parsedPasswordInput.data;
      }
    }
    if (emailSaveCheckRef.current) {
      inputInfo.isEmailToBeSaved =
        emailSaveCheckRef.current.ariaChecked === 'true' ? true : false;
    }

    console.log(inputInfo);

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
            <div className='flex items-center gap-2 self-start left-[10px] relative'>
              <Checkbox id='saveEmail' ref={emailSaveCheckRef} />
              <label htmlFor='saveEmail' className='text-sm'>
                이메일 저장
              </label>
            </div>
          </>
        )}
        <Button type='submit' className='w-full my-5'>
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
            {Object.entries(SOCIAL_LOGIN_BUTTONS).map(([name, url]) => (
              <SocialLoginButton key={name} logoURL={url} name={name} />
            ))}
          </section>
        </>
      )}
    </article>
  );
}
