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
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import SignUpCompleteAlert from '@/components/SignUpCompleteAlert';
import SignUpFormField from '@/components/ui/customUI/signUpFormField';

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해주세요.' })
      .max(20, { message: '최대 20자까지 입력 가능합니다.' })
      .regex(/^[a-zA-Z0-9]+$/, { message: '특수문자는 사용할 수 없습니다.' }),
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
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
  });
  const navigate = useNavigate();
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [userData, setUserData] = useState<userInfoType | null>(null);
  const onSubmit = (data: userInfoType) => {
    if (data) {
      setSignUpCompleted(true);
      setUserData(data);
      console.log(data);
      setTimeout(() => navigate('/'), 2500);
    }
  };
  return (
    <section className='flex items-center justify-center w-full h-full'>
      {signUpCompleted && userData && (
        <SignUpCompleteAlert username={userData.username} />
      )}
      {!signUpCompleted && (
        <Card className='w-full max-w-[500px] m-auto'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>회원가입</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <SignUpFormField
                  form={form}
                  name='username'
                  label='사용자 이름'
                />
                <SignUpFormField
                  form={form}
                  name='email'
                  type='email'
                  label='이메일'
                />
                <SignUpFormField
                  form={form}
                  name='password'
                  type='password'
                  label='비밀번호'
                />
                <SignUpFormField
                  form={form}
                  name='confirmedPassword'
                  type='password'
                  label='비밀번호 확인'
                />
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
