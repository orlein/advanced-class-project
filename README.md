# 오즈코딩스쿨 심화반 프로젝트 템플릿

## 프로젝트 소개

- 프로젝트 명: 원정대
- 팀원: 원도훈, 정세윤
- 프로젝트 개요:
- 기술 스택:

## 프로젝트 기술 스택

- Framework/Library: React
- Dev Runtime: Node.js
- Bundler: Vite
- Language: TypeScript
- Routing: React Router
- State Management: 추후 결정
- Styling: tailwindcss, shadcn
- HTTP Client: axios
- Unit Test:

## 메뉴 구조

메뉴 구조

- 로그인
- 회원가입
- 비밀번호 찾기
- 프로필 보기 및 변경
- 계정 설정
  - 이메일 찾기
  - 비밀번호 재설정
- 설정
  - 알림 설정
  - 테마 설정
  - 커스터마이징 설정
  - 쿠키 설정
  - 차단 유저 관리
  - 프로필 공개 여부 설정
- 챌린지
  - 전체 챌린지 목록
    - 특정 카테고리 챌린지 목록\*
  - 새로운 챌린지 생성
  - 우수 챌린지 목록
  - 챌린지 성공한 유저 목록
  - 챌린지 상세 페이지\*
    - 챌린지 참여 페이지\*
    - 챌린지 수정 페이지\*
    - 챌린지 이벤트 목록\*
      - 챌린지 이벤트 상세 페이지\*
  - 나의 챌린지 목록
    - 완료한 챌린지 목록
- 나의 챌린지 이벤트 목록
  - 참여 중인 챌린지 이벤트
  - 완료한 챌린지 이벤트
  - 실패한 챌린지 이벤트
- 글 관리
  - 전체 글 목록
  - 추천 수로 정렬된 글 목록
  - 새 글 작성 페이지
  - 글 상세 페이지\*
    - 글 수정 페이지\*
    - 댓글 목록\*
      - 새 댓글 작성\*
      - 댓글 수정\*
- 메시지 채널 목록
  - 특정 채팅방\*
    - 특정 메시지\*
  - 챌린지 채팅방 목록
    - 특정 챌린지 채팅방\*
      - 특정 메시지\*

## 배포

- 배포 환경: vercel.com
- 배포 방법: 버셀이 알아서 해줌
- CI/CD: CI는 vite build, CD는 vercel
- 배포 주소:
  - 원도훈: https://advanced-class-project-a.vercel.app/
  - 정세윤: https://oz-advanced-team-a.vercel.app/
  - 강사님: https://advanced-class-project-team-a.vercel.app/

## 개발 방법

- 사용 가능한 Editor / IDE : VSCode, Intellij
- 개발 환경 설정 방법:
  - node: v20.18.0
  - nvm: 0.40.1
- 로컬 개발 방법:
- PR 방법:
- Issue 관리 방법:
- 커밋 메시지 규칙:
  커밋 유형 | 의미
  -- | --
  Feat | 새로운 기능 추가
  Fix | 버그 수정
  Docs | 문서 수정
  Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
  Refactor | 코드 리팩토링
  Test | 테스트 코드, 리팩토링 테스트 코드 추가
  Chore | 패키지 매니저 수정, 그 외 기타 수정 e.g. .gitignore
  Design | CSS 등 사용자 UI 디자인 변경
  Comment | 필요한 주석 추가 및 변경
  Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
  Remove or Delete | 파일을 삭제하는 작업만 수행한 경우
  !BREAKING CHANGE | 커다란 API 변경의 경우
  !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우
