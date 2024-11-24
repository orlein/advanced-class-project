import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ChallengeDetail() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => navigate(-1)}
        className="self-start flex gap-2 items-center mb-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
      >
        <ChevronLeft size={20} />
        뒤로 가기
      </div>
      <Separator />
      <div className="max-w-5xl w-full mt-5">
        <Outlet />
      </div>
    </div>
  );
}
