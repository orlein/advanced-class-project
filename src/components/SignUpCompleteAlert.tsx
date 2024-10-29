import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PartyPopper } from 'lucide-react';

export default function SignUpCompleteAlert({
  username,
}: {
  username: string;
}) {
  return (
    <>
      <Alert className='w-full max-w-[500px] flex items-start gap-3 py-7'>
        <section>
          <PartyPopper size={20} className='' />
        </section>
        <section>
          <AlertTitle>Welcome!</AlertTitle>
          <AlertDescription>{username}님! 가입을 환영합니다.</AlertDescription>
        </section>
      </Alert>
    </>
  );
}
