import PasswordFormField from '@/components/molecule/field/PasswordFormField';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useIsMobile } from '@/hooks/use-mobile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g, {
        message: '비밀번호를 확인해주세요.',
      }),
    newPassword: z
      .string()
      .trim()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g, {
        message: '비밀번호를 확인해주세요.',
      }),
    newConfirmedPassword: z
      .string()
      .trim()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g, {
        message: '비밀번호를 확인해주세요.',
      }),
  })
  .refine(data => data.newPassword === data.newConfirmedPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmedPassword'],
  });
type passwordType = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const isMobile = useIsMobile();
  const form = useForm<passwordType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newConfirmedPassword: '',
    },
  });
  const onSubmit = (data: passwordType) => {
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
          <PasswordFormField form={form} name="newPassword" label="새로운 비밀번호" />
          <PasswordFormField form={form} name="newConfirmedPassword" label="새로운 비밀번호 확인" />
          <Button>비밀번호 변경</Button>
        </form>
      </Form>
    </>
  );
}
