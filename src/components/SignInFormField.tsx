import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './ui/form';
import EmailFormField from './EmailFormField';
import PasswordFormField from './PasswordFormField';
import Google from '../assets/Google.png';
import Kakao from '../assets/Kakao.png';
import Naver from '../assets/Naver.png';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButton from './ui/customUI/socialLoginButton';
import ResetPassword from '@/pages/account/ResetPassword';
import CheckBoxFormField from './CheckBoxFormField';
import { useAuthContext } from '@/contexts/AuthContext';

const SOCIAL_LOGIN_BUTTONS = {
  구글: Google,
  카카오: Kakao,
  네이버: Naver,
};

interface SignInFormFieldProp {
  currentTab: 'Sign in' | 'Email' | 'Password';
}

const emailSchemaObject = {
  email: z
    .string()
    .trim()
    .nonempty({ message: '이메일 주소를 입력해 주세요.' })
    .email({ message: '이메일 주소를 확인해 주세요.' }),
};

const emailSchema = z.object({ ...emailSchemaObject });
const formSchema = z.object({
  ...emailSchemaObject,
  password: z
    .string()
    .trim()
    .nonempty('비밀번호를 입력해 주세요.')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g,
      { message: '비밀번호를 확인해 주세요.' }
    )
    .optional(),
  isEmailToBeSaved: z.boolean().default(false).optional(),
});

export default function SignInFormField({ currentTab }: SignInFormFieldProp) {
  const navigate = useNavigate();
  const schema = currentTab === 'Sign in' ? formSchema : emailSchema;
  const defaultValues =
    currentTab === 'Sign in'
      ? {
          email: '',
          password: '',
          isEmailToBeSaved: false,
        }
      : { email: '' };
  const { signIn } = useAuthContext();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const onSubmit = (data: z.infer<typeof schema>) => {
    if (data) {
      console.log(data);
      if (currentTab === 'Sign in') {
        signIn();
        navigate('/');
      }
    }
  };
  return (
    <article className='flex flex-col items-center justify-center gap-7 h-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-5'
        >
          <EmailFormField form={form} />
          {currentTab === 'Sign in' && (
            <>
              <PasswordFormField form={form} icon={true} placeholder={true} />
              <CheckBoxFormField form={form} label='이메일 저장' />
            </>
          )}
          <Button type='submit' className='mt-5'>
            {currentTab === 'Sign in' && '로그인'}
            {currentTab === 'Email' && '이메일 찾기'}
            {currentTab === 'Password' && '비밀번호 찾기'}
          </Button>
        </form>
      </Form>
      {currentTab === 'Sign in' && (
        <>
          <p className='text-sm text-muted-foreground'>
            아직 회원이 아니신가요?{' '}
            <Link to='/sign-up'>
              <span className='ml-1 font-semibold hover:underline cursor-pointer text-foreground'>
                회원가입
              </span>
            </Link>
          </p>
          <section className='w-full flex flex-col items-center gap-7'>
            <div className='w-full'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <section className='flex gap-5'>
              {Object.entries(SOCIAL_LOGIN_BUTTONS).map(([name, url]) => (
                <SocialLoginButton key={name} logoURL={url} name={name} />
              ))}
            </section>
          </section>
        </>
      )}
      {currentTab === 'Password' && <ResetPassword />}
    </article>
  );
}
