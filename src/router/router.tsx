import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <div>홈 페이지 내용</div> },
            { path: 'sign-in', element: <div>로그인</div> },
            { path: 'sign-up', element: <div>회원가입</div> },
            { path: 'find-password', element: <div>비밀번호 찾기 페이지</div> },
            { path: 'my-profile', element: <div>프로필 페이지</div> },
            {
                path: 'account',
                element: <div>계정 설정</div>,
                children: [
                    { path: 'find-email', element: <div>이메일 찾기</div> },
                    { path: 'reset-password', element: <div>비밀번호 재설정</div> },
                ],
            },
            {
                path: 'settings',
                element: <div>설정 페이지</div>,
                children: [
                    { path: 'notifications', element: <div>알림 설정</div> },
                    { path: 'appearances', element: <div>테마 설정</div> },
                    { path: 'customization', element: <div>UI 커스터마이징</div> },
                    { path: 'cookie', element: <div>쿠키 설정</div> },
                    { path: 'block-users', element: <div>차단 관리</div> },
                    { path: 'private-account', element: <div>프로필 비공개 관리</div> },
                ],
            },
            {
                path: 'challenges',
                element: <div>전체 챌린지 목록</div>,
                children: [
                    { path: 'category/:category', element: <div>특정 카테고리 챌린지 목록</div> },
                    {
                        path: ':id',
                        element: <div>챌린지 상세 페이지</div>,
                        children: [
                            { path: 'join', element: <div>챌린지 참여 페이지</div> },
                            { path: 'edit', element: <div>챌린지 수정 페이지</div> },
                            {
                                path: 'events',
                                element: <div>챌린지 이벤트 목록</div>,
                                children: [
                                    {
                                        path: ':eventId',
                                        element: <div>챌린지 이벤트 상세</div>,
                                        children: [
                                            { path: 'edit', element: <div>챌린지 이벤트 수정</div> },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    { path: 'success-users', element: <div>챌린지 성공한 유저 목록</div> },
                    { path: 'top', element: <div>우수 챌린지 목록</div> },
                    { path: 'new', element: <div>새로운 챌린지 생성</div> },
                ],
            },
            {
                path: 'my-challenges',
                element: <div>내가 참여 중인 챌린지 목록</div>,
                children: [
                    { path: 'completed', element: <div>내가 완료한 챌린지 목록</div> },
                ],
            },
            {
                path: 'posts',
                element: <div>글 목록</div>,
                children: [
                    { path: 'new', element: <div>새 글 작성 페이지</div> },
                    {
                        path: ':id',
                        element: <div>글 상세 페이지</div>,
                        children: [
                            { path: 'edit', element: <div>글 수정 페이지</div> },
                            {
                                path: 'comments',
                                element: <div>댓글 목록</div>,
                                children: [
                                    { path: 'new', element: <div>새 댓글 작성</div> },
                                ],
                            },
                        ],
                    },
                    { path: 'sort/likes', element: <div>추천 수로 정렬된 글 목록</div> },
                ],
            },
            { path: 'comments/:id/edit', element: <div>댓글 수정</div> },
            {
                path: 'my-events',
                element: <div>내가 참여 중인 이벤트 목록</div>,
                children: [
                    { path: 'upcoming', element: <div>내가 참여 예정인 이벤트 목록</div> },
                    { path: 'completed', element: <div>내가 완료한 이벤트 목록</div> },
                    { path: 'failed', element: <div>내가 실패한 이벤트 목록</div> },
                ],
            },
            {
                path: 'message-channels',
                element: <div>메시지 채널 목록</div>,
                children: [
                    { path: ':id', element: <div>특정 채팅방</div> },
                    {
                        path: 'challenges',
                        element: <div>챌린지 메시지 채널</div>,
                        children: [
                            { path: ':challengeId', element: <div>특정 챌린지 채팅방</div> },
                        ],
                    },
                ],
            },
            { path: 'messages/:id', element: <div>특정 메시지 보기</div> },
        ],
    },
]);

export default router;
