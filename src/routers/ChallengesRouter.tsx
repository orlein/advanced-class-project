import AllChallenges from '@/pages/challenges/AllChallenges';
import ChallengeMain from '@/pages/challenges/ChallengesMain';
import ChallengesByCategory from '@/pages/challenges/ChallengesByCategory';
import ChallengeDetail from '@/pages/challenges/individualChallenge/ChallengeDetail';
import ChallengeDetailDescription from '@/pages/challenges/individualChallenge/ChallengeDetailDescription';
import ChallengeEventDetail from '@/pages/challenges/individualChallenge/ChallengeEventDetail';
import ChallengeEventsList from '@/pages/challenges/individualChallenge/ChallengeEventsList';
import EditChallenge from '@/pages/challenges/individualChallenge/EditChallenge';
import EditChallengeEvent from '@/pages/challenges/individualChallenge/EditChallengeEvent';
import JoinChallenge from '@/pages/challenges/individualChallenge/JoinChallenge';
import NewChallenge from '@/pages/challenges/NewChallenge';
import SuccessUsers from '@/pages/challenges/SuccessUsers';
import TopChallenges from '@/pages/challenges/TopChallenges';
import ProtectedRouter from '@/pages/ProtectedRouter';
import ChallengeEditProtectedRouter from '@/pages/ChallengeEditProtectedRouter';

const eventsRouter = [
  { path: 'events', element: <ChallengeEventsList /> },
  {
    path: 'events/:event_id',
    element: <ChallengeEventDetail />,
    children: [{ path: 'edit', element: <EditChallengeEvent /> }],
  },
];

export const individualChallengeRouter = [
  {
    path: 'challenges/:challenge_id',
    element: <ChallengeDetail />,
    children: [
      { index: true, element: <ChallengeDetailDescription /> },
      { path: 'join', element: <JoinChallenge /> },
      {
        path: 'edit',
        element: (
          <ChallengeEditProtectedRouter>
            <EditChallenge />
          </ChallengeEditProtectedRouter>
        ),
      },
      ...eventsRouter,
    ],
  },
];

export const challengesRouter = [
  {
    path: 'challenges',
    element: <ChallengeMain />,
    children: [
      { index: true, element: <AllChallenges /> },
      { path: 'category/:category', element: <ChallengesByCategory /> },
      { path: 'success-users', element: <SuccessUsers /> },
      { path: 'top', element: <TopChallenges /> },
    ],
  },
];

export const newChallengeRouter = [
  {
    path: 'challenges/new',
    element: (
      <ProtectedRouter>
        <NewChallenge />
      </ProtectedRouter>
    ),
  },
];
