import MyChallenges from '@/pages/challenges/MyChallenges';
import MyCompletedChallenges from '@/pages/challenges/MyCompletedChallenges';

export const myChallengesRouter = [
  {
    path: 'my-challenges',
    element: <MyChallenges />,
    children: [{ path: 'completed', element: <MyCompletedChallenges /> }],
  },
];
