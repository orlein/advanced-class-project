import PasswordFormField from '@/components/molecule/field/PasswordFormField';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useIsMobile } from '@/hooks/use-mobile';
import { resetPasswordSchema } from '@/lib/schemas/userInfoSchema';
import { ResetPasswordData } from '@/types/userData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
  const isMobile = useIsMobile();
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = (data: ResetPasswordData) => {
    // 현재 비밀번호에 입력한 비밀번호와 실제 비밀번호 일치 여부 확인 필요
    if (data) console.log(data);
  };
  return (
    <>
      <section className="text-left w-full">
        <CardTitle className="text-2xl mb-2">비밀번호 재설정</CardTitle>
        <CardDescription>
          비밀번호는 8자~15자이어야 하며, <br className={isMobile ? 'block' : 'hidden'} />
          영문 대소문자, 숫자, 특수 문자를 포함해야 합니다.
        </CardDescription>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
          <PasswordFormField form={form} name="currentPassword" label="현재 비밀번호" />
          <PasswordFormField form={form} name="password" label="새로운 비밀번호" />
          <PasswordFormField form={form} name="confirmPassword" label="새로운 비밀번호 확인" />
          <Button>비밀번호 변경</Button>
        </form>
      </Form>
    </>
  );
}
