import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateRemainingDays = (endDate: string): string => {
  const remainingDays = Math.ceil(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  return remainingDays > 0 ? `${remainingDays}일 남음` : '종료';
};
