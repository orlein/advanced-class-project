import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordFormField from '@/components/molecule/field/PasswordFormField';
import EmailFormField from '@/components/molecule/field/EmailFormField';
// import { useToast } from '@/hooks/use-toast';
// import { ToastAction } from '@radix-ui/react-toast';
import { Toaster } from '@/components/ui/toaster';
import { useSignUpMutation } from '@/api/accountApi';
import { SignUpRequestData } from '@/types/userData';
import { signUpRequestSchema } from '@/lib/schemas/userInfoSchema';
import UsernameFormField from '@/components/molecule/field/UsernameFormField';

export default function SignUp() {
  const form = useForm<SignUpRequestData>({
    resolver: zodResolver(signUpRequestSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // const { toast } = useToast();
  const onSubmit = (data: SignUpRequestData) => {
    signUp(data).then(() => {
      // if (res.error && 'status' in res.error && res.error.status === 409) {
      //   toast({
      //     description: '이미 가입한 이메일입니다.',
      //     variant: 'destructive',
      //     duration: 3000,
      //     action: (
      //       <ToastAction altText="확인" className="text-sm">
      //         확인
      //       </ToastAction>
      //     ),
      //   });
      // } else if (!res.error)
      setIsSubmitted(true);
    });
  };

  return (
    <section className="flex items-center justify-center w-full h-full">
      <Toaster />
      {isSubmitted && (
        <Card className="w-full max-w-[500px] m-auto">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl mb-2">회원가입이 완료되었습니다!</CardTitle>
            <CardDescription>
              환영합니다! 이제 서비스를 자유롭게 이용하실 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center mt-10 gap-4">
            <Button onClick={() => navigate('/sign-in')}>로그인 하기</Button>
          </CardContent>
        </Card>
      )}
      {!isSubmitted && (
        <Card className="w-full max-w-[500px] m-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl mb-2">회원가입</CardTitle>
            <CardDescription>회원가입을 위해 아래 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <UsernameFormField form={form} />
                <EmailFormField form={form} label={true} icon={false} placeholder={false} />
                <PasswordFormField form={form} name="password" label="비밀번호" />
                <PasswordFormField form={form} name="confirmPassword" label="비밀번호 확인" />
                <Button type="submit" className="w-full">
                  가입하기
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
