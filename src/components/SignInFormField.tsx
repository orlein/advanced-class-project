import { Form } from './ui/form';
import EmailFormField from './EmailFormField';
import PasswordFormField from './PasswordFormField';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ResetPassword from '@/pages/account/ResetPassword';
import CheckBoxFormField from './CheckBoxFormField';
import { CurrentTab } from '@/types/signin';
import useSignInForm from '@/hooks/useSignInForm';

interface SignInFormFieldProp {
  currentTab: CurrentTab;
}

export default function SignInFormField({ currentTab }: SignInFormFieldProp) {
  const { form, onSubmit } = useSignInForm(currentTab);

  return (
    <article className="flex flex-col items-center justify-center gap-7 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
          <EmailFormField form={form} />
          {currentTab === 'Sign in' && (
            <>
              <PasswordFormField form={form} icon={true} placeholder={true} />
              <CheckBoxFormField form={form} label="이메일 저장" />
            </>
          )}
          <Button type="submit">
            {currentTab === 'Sign in' && '로그인'}
            {currentTab === 'Email' && '이메일 찾기'}
            {currentTab === 'Password' && '비밀번호 찾기'}
          </Button>
        </form>
      </Form>
      {currentTab === 'Sign in' && (
        <>
          <p className="text-sm text-muted-foreground">
            아직 회원이 아니신가요?{' '}
            <Link to="/sign-up">
              <span className="ml-1 font-semibold hover:underline cursor-pointer text-foreground">
                회원가입
              </span>
            </Link>
          </p>
        </>
      )}
      {currentTab === 'Password' && <ResetPassword />}
    </article>
  );
}
