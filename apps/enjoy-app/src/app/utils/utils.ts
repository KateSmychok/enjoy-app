import { coverColors } from './constants';

export const getRandomColor = (index: number): string => {
  return coverColors[index >= 0 && index <= 9 ? index : 0];
};
