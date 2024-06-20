import { ActivityType, ItemState } from '@generated/models';
import { UserActivityType } from '@store/types';

export interface UsersActivityState {
  inProgress: number[];
  completed: number[];
  planned: number[];
}

export const getActivityType = (
  type: ActivityType,
): 'books' | 'series' | 'games' => {
  switch (type) {
    case ActivityType.Reading:
      return 'books';
    case ActivityType.Watching:
      return 'series';
    case ActivityType.Playing:
      return 'games';
  }
};

export const getKey = (
  type: ActivityType,
  itemState: ItemState,
): UserActivityType => {
  return (getActivityType(type) + itemState) as UserActivityType;
};

export const getUsersType = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.Reading:
      return 'readers';
    case ActivityType.Watching:
      return 'watchers';
    case ActivityType.Playing:
      return 'gamers';
    default:
      return '';
  }
};

export const mapDtoToId = <T extends { id: number }>(items: T[]): number[] => {
  return items?.map((i) => i.id);
};
