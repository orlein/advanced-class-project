import AllMessageChannels from '@/pages/message/AllMessageChannels';
import ChallengeChatRoom from '@/pages/message/ChallengeChatRoom';
import ChallengeChatRoomList from '@/pages/message/ChallengeChatRoomList';
import ChatRoom from '@/pages/message/ChatRoom';
import MessageChannelsMain from '@/pages/message/MessageChannelsMain';
import SpecificMessage from '@/pages/message/SpecificMessage';

export const messageChannelsRouter = [
  {
    path: 'message-channels',
    element: <MessageChannelsMain />,
    children: [
      { index: true, element: <AllMessageChannels /> },
      { path: ':channel_id', element: <ChatRoom /> },
      { path: 'challenges', element: <ChallengeChatRoomList /> },
      { path: 'challenges/:challenge_id', element: <ChallengeChatRoom /> },
    ],
  },
  { path: 'messages/:message_id', element: <SpecificMessage /> },
];
