import { ChevronLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChallengeEventsList from './ChallengeEventsList';

export default function ChallengeDetail() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center max-w-5xl w-full">
        <div
          onClick={() => navigate(-1)}
          className="self-start flex gap-2 items-center mb-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
        >
          <ChevronLeft size={20} />
          뒤로 가기
        </div>
        <div className="w-full mt-5">
          <Outlet />
        </div>
        <section className="mt-5">
          <ChallengeEventsList />
        </section>
      </div>
    </div>
  );
}
