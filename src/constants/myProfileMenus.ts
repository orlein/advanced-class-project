import { User } from '@/RTK/slice';

interface SelectMenus {
  field: keyof User;
  label: string;
  placeholder: string;
  options: string[];
}

export const SELECT_MENUS: SelectMenus[] = [
  {
    field: 'location',
    label: '지역',
    placeholder: '지역을 선택하세요.',
    options: [
      '서울특별시',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '경기도',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도',
    ],
  },
  {
    field: 'mainLanguage',
    label: '주 언어',
    placeholder: '언어를 선택하세요.',
    options: [
      '한국어',
      '영어',
      '일본어',
      '중국어',
      '스페인어',
      '프랑스어',
      '독일어',
      '이탈리아어',
      '러시아어',
      '아랍어',
      '힌디어',
      '포르투갈어',
    ],
  },
];
