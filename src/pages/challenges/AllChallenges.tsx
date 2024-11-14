import Tag from '@/components/atom/Tag';
import ChallengeCard from '@/components/molecule/ChallengeCard';
import { tags } from '@/constants/challenge';

export default function AllChallenges() {
  return (
    <div className="flex flex-col gap-[60px] flex-wrap">
      <div className="flex justify-end">
        <input />
        <button>검색</button>
      </div>
      <div className="flex gap-3">
        {tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <select>
          <option>진행전</option>
          <option>진행중</option>
          <option>종료</option>
        </select>
        <select>
          <option>날짜순</option>
          <option>인기순</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-10">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            title={challenge.title}
            startDate={challenge.startDate}
            endDate={challenge.endDate}
            tags={challenge.tags}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
const challenges = [
  {
    title: '30일 명상 챌린지',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    tags: ['명상', '정신건강', '챌린지'],
  },
  {
    title: '30일 요가 챌린지',
    startDate: '2024-07-01',
    endDate: '2024-07-30',
    tags: ['요가', '운동', '챌린지'],
  },
  {
    title: '30일 글쓰기 챌린지',
    startDate: '2024-08-01',
    endDate: '2024-08-30',
    tags: ['글쓰기', '자기계발', '챌린지'],
  },
  {
    title: '30일 그림 그리기 챌린지',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    tags: ['그림', '예술', '챌린지'],
  },
  {
    title: '30일 외국어 학습 챌린지',
    startDate: '2024-10-01',
    endDate: '2024-10-30',
    tags: ['외국어', '학습', '챌린지'],
  },
  {
    title: '30일 건강한 식습관 챌린지',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    tags: ['식습관', '건강', '챌린지'],
  },
  {
    title: '30일 자원봉사 챌린지',
    startDate: '2024-12-01',
    endDate: '2024-12-30',
    tags: ['자원봉사', '사회공헌', '챌린지'],
  },
  {
    title: '30일 재테크 챌린지',
    startDate: '2025-01-01',
    endDate: '2025-01-30',
    tags: ['재테크', '금융', '챌린지'],
  },
  {
    title: '30일 환경 보호 챌린지',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    tags: ['환경', '지속가능성', '챌린지'],
  },
  {
    title: '30일 스트레칭 챌린지',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    tags: ['스트레칭', '운동', '챌린지'],
  },
  {
    title: '30일 다이어리 쓰기 챌린지',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    tags: ['다이어리', '자기계발', '챌린지'],
  },
  {
    title: '30일 사진 편집 챌린지',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    tags: ['사진', '편집', '챌린지'],
  },
  {
    title: '30일 DIY 챌린지',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    tags: ['DIY', '창의력', '챌린지'],
  },
  {
    title: '30일 음악 감상 챌린지',
    startDate: '2025-07-01',
    endDate: '2025-07-30',
    tags: ['음악', '취미', '챌린지'],
  },
  {
    title: '30일 영화 감상 챌린지',
    startDate: '2025-08-01',
    endDate: '2025-08-30',
    tags: ['영화', '취미', '챌린지'],
  },
  {
    title: '30일 여행 계획 챌린지',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    tags: ['여행', '계획', '챌린지'],
  },
  {
    title: '30일 새로운 레시피 챌린지',
    startDate: '2025-10-01',
    endDate: '2025-10-30',
    tags: ['요리', '레시피', '챌린지'],
  },
  {
    title: '30일 정리 정돈 챌린지',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    tags: ['정리', '청소', '챌린지'],
  },
  {
    title: '30일 새로운 취미 챌린지',
    startDate: '2025-12-01',
    endDate: '2025-12-30',
    tags: ['취미', '도전', '챌린지'],
  },
  {
    title: '30일 자아 발견 챌린지',
    startDate: '2026-01-01',
    endDate: '2026-01-30',
    tags: ['자아', '발견', '챌린지'],
  },
  {
    title: '30일 긍정적 사고 챌린지',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    tags: ['긍정', '사고', '챌린지'],
  },
  {
    title: '30일 가족과의 시간 챌린지',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    tags: ['가족', '시간', '챌린지'],
  },
  {
    title: '30일 새로운 기술 배우기 챌린지',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    tags: ['기술', '배우기', '챌린지'],
  },
  {
    title: '30일 자아 성찰 챌린지',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
    tags: ['성찰', '자기계발', '챌린지'],
  },
  {
    title: '30일 친구와의 소통 챌린지',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    tags: ['소통', '친구', '챌린지'],
  },
  {
    title: '30일 새로운 운동 배우기 챌린지',
    startDate: '2026-07-01',
    endDate: '2026-07-30',
    tags: ['운동', '배우기', '챌린지'],
  },
  {
    title: '30일 자원 관리 챌린지',
    startDate: '2026-08-01',
    endDate: '2026-08-30',
    tags: ['자원', '관리', '챌린지'],
  },
  {
    title: '30일 새로운 문화 체험 챌린지',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    tags: ['문화', '체험', '챌린지'],
  },
  {
    title: '30일 건강한 습관 만들기 챌린지',
    startDate: '2026-10-01',
    endDate: '2026-10-30',
    tags: ['습관', '건강', '챌린지'],
  },
  {
    title: '30일 새로운 사람 만나기 챌린지',
    startDate: '2026-11-01',
    endDate: '2026-11-30',
    tags: ['사람', '만남', '챌린지'],
  },
  {
    title: '30일 자기계발 도서 읽기 챌린지',
    startDate: '2026-12-01',
    endDate: '2026-12-30',
    tags: ['독서', '자기계발', '챌린지'],
  },
  {
    title: '30일 새로운 언어 배우기 챌린지',
    startDate: '2027-01-01',
    endDate: '2027-01-30',
    tags: ['언어', '배우기', '챌린지'],
  },
  {
    title: '30일 새로운 기술 도전 챌린지',
    startDate: '2027-02-01',
    endDate: '2027-02-28',
    tags: ['기술', '도전', '챌린지'],
  },
  {
    title: '30일 새로운 운동 시도 챌린지',
    startDate: '2027-03-01',
    endDate: '2027-03-31',
    tags: ['운동', '시도', '챌린지'],
  },
  {
    title: '30일 새로운 요리법 도전 챌린지',
    startDate: '2027-04-01',
    endDate: '2027-04-30',
    tags: ['요리', '도전', '챌린지'],
  },
  {
    title: '30일 새로운 취미 찾기 챌린지',
    startDate: '2027-05-01',
    endDate: '2027-05-31',
    tags: ['취미', '찾기', '챌린지'],
  },
  {
    title: '30일 새로운 친구 만들기 챌린지',
    startDate: '2027-06-01',
    endDate: '2027-06-30',
    tags: ['친구', '만들기', '챌린지'],
  },
  {
    title: '30일 새로운 경험 쌓기 챌린지',
    startDate: '2027-07-01',
    endDate: '2027-07-30',
    tags: ['경험', '쌓기', '챌린지'],
  },
  {
    title: '30일 새로운 목표 설정 챌린지',
    startDate: '2027-08-01',
    endDate: '2027-08-30',
    tags: ['목표', '설정', '챌린지'],
  },
  {
    title: '30일 새로운 도전하기 챌린지',
    startDate: '2027-09-01',
    endDate: '2027-09-30',
    tags: ['도전', '새로운', '챌린지'],
  },
  {
    title: '30일 새로운 기술 연습 챌린지',
    startDate: '2027-10-01',
    endDate: '2027-10-30',
    tags: ['기술', '연습', '챌린지'],
  },
  {
    title: '30일 새로운 취미 도전 챌린지',
    startDate: '2027-11-01',
    endDate: '2027-11-30',
    tags: ['취미', '도전', '챌린지'],
  },
  {
    title: '30일 새로운 사람과 대화하기 챌린지',
    startDate: '2027-12-01',
    endDate: '2027-12-30',
    tags: ['대화', '사람', '챌린지'],
  },
  {
    title: '30일 운동 챌린지',
    startDate: '2024-01-01',
    endDate: '2024-01-30',
    tags: ['운동', '건강', '챌린지'],
  },
  {
    title: '독서 챌린지',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    tags: ['독서', '자기계발', '챌린지'],
  },
  {
    title: '다이어트 챌린지',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    tags: ['다이어트', '건강', '챌린지'],
  },
  {
    title: '코딩 챌린지',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    tags: ['코딩', '기술', '챌린지'],
  },
  {
    title: '사진 촬영 챌린지',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    tags: ['사진', '예술', '챌린지'],
  },
];
