import { useSignInMutation } from '@/api/accountApi';
import { emailSchema, signInFormSchema } from '@/lib/schemas/userInfoSchema';
import { CurrentTab } from '@/types/signInTab';
import { SignInFormData, SignInRequestData } from '@/types/userData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const useSignInForm = (currentTab: CurrentTab) => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const schema = currentTab === 'Sign in' ? signInFormSchema : emailSchema;
  const defaultValues =
    currentTab === 'Sign in'
      ? {
          email: localStorage.getItem('savedEmail') ?? '',
          password: '',
          isEmailToBeSaved: localStorage.getItem('savedEmail') ? true : false,
        }
      : { email: '' };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (currentTab === 'Sign in') {
      const { email, password, isEmailToBeSaved } = data as SignInFormData;
      isEmailToBeSaved
        ? localStorage.setItem('savedEmail', email)
        : localStorage.removeItem('savedEmail');
      const signInRequest: SignInRequestData = { email, password };
      signIn(signInRequest);
      navigate('/');
    } else {
      // 이메일 찾기 및 비밀번호 찾기 로직 구현 필요
    }
  };
  return { form, onSubmit, currentTab };
};

export default useSignInForm;
