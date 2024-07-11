import React from 'react';
import Tabs from '@global/components/tabs/tabs';
import { useProfilePage } from './use-profile-page';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { Pagination } from '@global/components/pagination/pagination';
import { activityTabs, stateTabs } from '@global/constants';
import { ActivityType, ItemState } from '@generated/models';
import UserItemsList from '../../layouts/user-items-list/user-items-list';
import { withErrorBoundary } from '@global/utils/error-boundary';
import RetryPanel from '../../layouts/retry-panel/retry-panel';

function ProfilePageInner() {
  const {
    selectedActivityType,
    onSetActivityType,
    selectedStateType,
    onSetStateType,
    relevantItems,
    page,
    onSetPage,
    totalPages,
  } = useProfilePage();

  const isNotReady = true;

  if (isNotReady) return null;

  return (
    <div>
      <Tabs<ActivityType>
        tabs={activityTabs}
        selectedTab={selectedActivityType}
        onSelect={(tab: ActivityType) => onSetActivityType(tab)}
        size={'m'}
      />
      <Tabs<ItemState>
        tabs={stateTabs}
        selectedTab={selectedStateType}
        onSelect={(tab: ItemState) => onSetStateType(tab)}
        size={'s'}
      />
      <div css={[columnContainerStyle, yCenteredStyle, fullWidthStyle]}>
        <UserItemsList
          items={relevantItems}
          activityType={selectedActivityType}
          onOpenAuthModal={() => null}
        />
        <Pagination
          totalPages={totalPages}
          selectedPage={page}
          onSelect={onSetPage}
        />
      </div>
    </div>
  );
}

const ProfilePage = () =>
  withErrorBoundary(
    <ProfilePageInner />,
    (retryProps) => <RetryPanel {...retryProps} />,
    'profile',
  );

export default ProfilePage;
