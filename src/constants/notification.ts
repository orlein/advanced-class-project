import { NotificationSectionKey } from '@/types/notification';

export const POST_NOTIFICATION_SWITCH = [
  {
    name: 'new_comments',
    label: '새 댓글',
    description: '내 포스트에 새 댓글이 달리면 알림을 받습니다.',
  },
  {
    name: 'replies_to_comments',
    label: '댓글에 대한 답글',
    description: '내 댓글에 답글이 달리면 알림을 받습니다.',
  },
  {
    name: 'post_recommendations',
    label: '포스트 추천',
    description: '누군가 내 포스트를 추천하면 알림을 받습니다.',
  },
  {
    name: 'mentions',
    label: '멘션',
    description: '포스트나 댓글에서 멘션되면 알림을 받습니다.',
  },
] as const;

export const CHALLENGE_NOTIFICATION_SWITCH = [
  {
    name: 'new_challenges',
    label: '새로운 챌린지',
    description: '새로운 챌린지가 시작되면 알림을 받습니다.',
  },
  {
    name: 'challenge_updates',
    label: '챌린지 업데이트',
    description: '참여 중인 챌린지의 업데이트를 받습니다.',
  },
  {
    name: 'challenge_completion',
    label: '챌린지 완료',
    description: '챌린지를 완료하거나 마일스톤을 달성하면 알림을 받습니다.',
  },
  {
    name: 'challenge_events',
    label: '챌린지 이벤트',
    description: '챌린지 이벤트의 시작 및 종료 알림을 받습니다.',
  },
] as const;

export const SOCIAL_NOTIFICATION_SWITCH = [
  {
    name: 'new_followers',
    label: '새로운 팔로워',
    description: '누군가 나를 팔로우하면 알림을 받습니다.',
  },
  {
    name: 'likes_on_comments',
    label: '댓글 추천',
    description: '누군가 내 댓글을 추천하면 알림을 받습니다.',
  },
] as const;

export const ACCOUNT_AND_SECURITY = [
  {
    name: 'profile_updates',
    label: '프로필 업데이트',
    description: '프로필 변경 시 알림을 받습니다.',
  },
  {
    name: 'password_changes',
    label: '비밀번호 변경',
    description: '비밀번호 변경 시 알림을 받습니다.',
  },
  {
    name: 'security_alerts',
    label: '보안 알림',
    description: '계정 보안 관련 중요한 알림을 받습니다.',
  },
] as const;

export const PROMOTION_AND_UPDATE = [
  {
    name: 'event_promotions',
    label: '이벤트 프로모션',
    description: '다가오는 이벤트 및 프로모션에 대한 알림을 받습니다.',
  },
  {
    name: 'newsletters',
    label: '뉴스레터',
    description: '최신 소식 및 업데이트를 위한 뉴스레터를 받습니다.',
  },
] as const;

export const OTHER_NOTIFICATION_SWITCH = [
  {
    name: 'direct_messages',
    label: '다이렉트 메시지',
    description: '다른 사용자로부터 다이렉트 메시지를 받으면 알림을 받습니다.',
  },
  {
    name: 'system_announcements',
    label: '시스템 공지사항',
    description: '중요한 시스템 업데이트나 유지보수에 대한 알림을 받습니다.',
  },
] as const;

export const NOTIFICATION_SECTION = {
  post: { title: '포스트 알림', switches: POST_NOTIFICATION_SWITCH },
  challenge: { title: '챌린지 알림', switches: CHALLENGE_NOTIFICATION_SWITCH },
  social: { title: '소셜 알림', switches: SOCIAL_NOTIFICATION_SWITCH },
  account: { title: '계정 및 보안', switches: ACCOUNT_AND_SECURITY },
  promotion: {
    title: '프로모션 및 업데이트',
    switches: PROMOTION_AND_UPDATE,
  },
  other: { title: '기타 알림', switches: OTHER_NOTIFICATION_SWITCH },
} as const;

export const NOTIFICATION_SECTION_LIST: NotificationSectionKey[] = [
  'post',
  'challenge',
  'social',
  'account',
  'promotion',
  'other',
] as const;
