import MyChallenges from '@/pages/challenges/MyChallenges';
import MyCompletedChallenges from '@/pages/challenges/MyCompletedChallenges';
import ProtectedRouter from '@/pages/ProtectedRouter';

export const myChallengesRouter = [
  {
    path: 'my-challenges',
    element: <MyChallenges />,
    children: [
      {
        path: 'completed',
        element: (
          <ProtectedRouter>
            <MyCompletedChallenges />
          </ProtectedRouter>
        ),
      },
    ],
  },
];
