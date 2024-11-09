import { AppDispatch } from '@/RTK/store';
import { updateLoginState } from '@/RTK/thunk';
import { emailSchema } from '@/lib/schemas/emailSchema';
import { signInSchema } from '@/lib/schemas/signInSchema';
import { CurrentTab } from '@/types/signin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const useSignInForm = (currentTab: CurrentTab) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const schema = currentTab === 'Sign in' ? signInSchema : emailSchema;
  const defaultValues =
    currentTab === 'Sign in'
      ? {
          email: '',
          password: '',
          isEmailToBeSaved: false,
        }
      : { email: '' };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (data && currentTab === 'Sign in') {
      dispatch(updateLoginState());
      navigate('/');
    }
  };
  return { form, onSubmit, currentTab };
};

export default useSignInForm;
