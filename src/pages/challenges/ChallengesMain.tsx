import { Outlet } from 'react-router-dom';

export default function ChallengesMain() {
  return (
    <section className="flex flex-col items-center">
      <div className="self-start flex flex-col gap-2 mb-10">
        <h1 className="text-3xl font-bold">챌린지</h1>
        <p>
          함께하는 도전, 함께하는 성장
          <br />
          변화는 도전하는 순간 시작됩니다.
        </p>
      </div>
      <Outlet />
    </section>
  );
}
