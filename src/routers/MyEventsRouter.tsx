import AllMyChallengeEvents from '@/pages/myChallengeEvent/AllMyChallengeEvents';
import MyChallengeEventsMain from '@/pages/myChallengeEvent/MyChallengeEventsMain';
import MyCompletedEvents from '@/pages/myChallengeEvent/MyCompletedEvents';
import MyFailedEvents from '@/pages/myChallengeEvent/MyFailedEvents';
import MyUpcomingEvents from '@/pages/myChallengeEvent/MyUpcomingEvents';
import ProtectedRouter from '@/pages/ProtectedRouter';

export const myEventsRouter = [
  {
    path: '/my-events',
    element: (
      <ProtectedRouter>
        <MyChallengeEventsMain />
      </ProtectedRouter>
    ),
    children: [
      { index: true, element: <AllMyChallengeEvents /> },
      { path: 'upcoming', element: <MyUpcomingEvents /> },
      { path: 'completed', element: <MyCompletedEvents /> },
      { path: 'failed', element: <MyFailedEvents /> },
    ],
  },
];
