import { tagColors } from '@/constants/challenge';

export type Challenge = {
  title: string;
  startDate: string;
  endDate: string;
  tags: TagType[];
};

export type TagType = keyof typeof tagColors;
