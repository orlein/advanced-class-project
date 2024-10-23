import { Button } from './button';

interface SocialNetworkServicesLogos {
  url: string;
  alt: string;
}

export default function SocialLoginButton({
  url,
  alt,
}: SocialNetworkServicesLogos) {
  return (
    <Button variant='secondary'>
      <div
        className={`${
          alt === '구글' && 'brightness-[93%]'
        } size-6 rounded-full overflow-hidden flex items-center justify-center`}
      >
        <img src={url} alt={alt} className='w-60' />
      </div>
      <p>{alt}</p>
    </Button>
  );
}
