import { ActivityType } from '@generated/models';

export const getPrefix = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.Reading:
      return 'books';
    case ActivityType.Watching:
      return 'series';
    case ActivityType.Playing:
      return 'games';
    default:
      return '';
  }
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
