import { useSignInMutation } from '@/api/accountApi';
import { emailSchema } from '@/lib/schemas/emailSchema';
import { signInSchema } from '@/lib/schemas/signInSchema';
import { CurrentTab } from '@/types/signin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const useSignInForm = (currentTab: CurrentTab) => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const schema = currentTab === 'Sign in' ? signInSchema : emailSchema;
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
    if (data && currentTab === 'Sign in') {
      const { email, password, isEmailToBeSaved } = data as z.infer<typeof signInSchema>;
      isEmailToBeSaved
        ? localStorage.setItem('savedEmail', email)
        : localStorage.removeItem('savedEmail');
      const signInData = { email, password };
      signIn(signInData);
      navigate('/');
    }
  };
  return { form, onSubmit, currentTab };
};

export default useSignInForm;
