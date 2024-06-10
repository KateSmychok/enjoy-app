import {TabProps} from "@global/components/tabs/tabs";
import {ActivityType, StateType} from "@global/utils/enum";

export const activityTabs: TabProps<ActivityType>[] = [
  {
    name: 'Books',
    type: ActivityType.Reading,
  },
  {
    name: 'Series',
    type: ActivityType.Watching,
  },
  {
    name: 'Games',
    type: ActivityType.Playing,
  }
]

export const stateTabs: TabProps<StateType>[] = [
  {
    name: 'Completed',
    type: StateType.Completed,
  },
  {
    name: 'In progress',
    type: StateType.InProgress,
  },
  {
    name: 'Planned',
    type: StateType.Planned,
  }
]
