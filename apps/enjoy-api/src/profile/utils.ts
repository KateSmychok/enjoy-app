import { ActivityType, ItemState } from '@enum';
import { UserActivityType } from '../utils/types';

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

export const getItemState = (
  itemState: ItemState,
): 'InProgress' | 'Completed' | 'Planned' => {
  switch (itemState) {
    case ItemState.InProgress:
      return 'InProgress';
    case ItemState.Completed:
      return 'Completed';
    case ItemState.Planned:
      return 'Planned';
  }
};

export const getKey = (
  type: ActivityType,
  itemState: ItemState,
): UserActivityType => {
  return (getActivityType(type) + getItemState(itemState)) as UserActivityType;
};
