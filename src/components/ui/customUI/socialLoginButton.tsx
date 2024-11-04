import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { updateLoginState } from '@/RTK/thunk';
import { AppDispatch } from '@/RTK/store';

interface SocialNetworkServicesLogos {
  logoURL: string;
  name: string;
}

export default function SocialLoginButton({
  logoURL,
  name,
}: SocialNetworkServicesLogos) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSocialLogin = () => {
    dispatch(updateLoginState());
    navigate('/');
  };
  return (
    <Button variant='secondary' onClick={handleSocialLogin}>
      <div
        className={`${
          name === '구글' && 'brightness-[93%]'
        } size-6 rounded-full overflow-hidden flex items-center justify-center`}
      >
        <img src={logoURL} alt={name} className='w-60' />
      </div>
      <p>{name}</p>
    </Button>
  );
}
