import { TabProps } from '@global/components/tabs/tabs';
import { ActivityType, ItemState } from '@generated/models';

export const activityTabs: TabProps<ActivityType>[] = [
  {
    name: 'Reading',
    type: ActivityType.Reading,
  },
  {
    name: 'Watching',
    type: ActivityType.Watching,
  },
  {
    name: 'Playing',
    type: ActivityType.Playing,
  },
];

export const stateTabs: TabProps<ItemState>[] = [
  {
    name: 'Completed',
    type: ItemState.Completed,
  },
  {
    name: 'In progress',
    type: ItemState.InProgress,
  },
  {
    name: 'Planned',
    type: ItemState.Planned,
  },
];
