import { Button } from '../button';
import { useAuthContext } from '@/contexts/AuthContext';

interface SocialNetworkServicesLogos {
  logoURL: string;
  name: string;
}

export default function SocialLoginButton({
  logoURL,
  name,
}: SocialNetworkServicesLogos) {
  const { signIn } = useAuthContext();
  const handleSocialLogin = () => {
    signIn();
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
