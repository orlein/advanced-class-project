import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordFormField from '@/components/PasswordFormField';
import EmailFormField from '@/components/EmailFormField';
import { truncate } from 'fs/promises';

const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty({ message: '이메일 주소를 입력해주세요.' })
      .email({ message: '이메일 주소를 확인해주세요.' }),
    password: z
      .string()
      .trim()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g,
        { message: '비밀번호를 확인해주세요.' }
      ),
    confirmedPassword: z
      .string()
      .trim()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,15}$/g,
        { message: '비밀번호를 확인해주세요.' }
      ),
    // mainLanguage: z.string(),
    // nationality: z.string(),
    // bio: z.string(),
    // externalUrls: z.array(z.string()),
    // interests: z.array(z.string()),
    // isEmailVerified: z.boolean(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmedPassword'],
  });
export type userInfoType = z.infer<typeof formSchema>;

export default function SignUp() {
  const form = useForm<userInfoType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
  });
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const onSubmit = (data: userInfoType) => {
    setIsSubmitted(true);
    console.log(data);
  };
  return (
    <section className='flex items-center justify-center w-full h-full'>
      {isSubmitted && (
        <Card className='w-full max-w-[500px] m-auto'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl mb-2'>
              회원가입이 완료되었습니다!
            </CardTitle>
            <CardDescription>
              환영합니다! 이제 서비스를 자유롭게 이용하실 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center mt-10 gap-4'>
            <Button onClick={() => navigate('/sign-in')}>로그인 하기</Button>
          </CardContent>
        </Card>
      )}
      {!isSubmitted && (
        <Card className='w-full max-w-[500px] m-auto'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl mb-2'>회원가입</CardTitle>
            <CardDescription>
              회원가입을 위해 아래 정보를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <EmailFormField
                  form={form}
                  label={true}
                  button={true}
                  icon={false}
                  placeholder={false}
                />
                <section className='flex gap-5'>
                  <PasswordFormField
                    form={form}
                    name='password'
                    label='비밀번호'
                  />
                  <PasswordFormField
                    form={form}
                    name='confirmedPassword'
                    label='비밀번호 확인'
                  />
                </section>
                <Button type='submit' className='w-full'>
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
