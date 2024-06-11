import { withErrorBoundary } from '@global/utils/error-boundary';
import RetryPanel from '@global/components/retry-panel/retry-panel';
import React from 'react';
import Tabs from '@global/components/tabs/tabs';
import { useProfilePage } from './use-profile-page';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { Pagination } from '@global/components/pagination/pagination';
import { activityTabs, stateTabs } from './constants';
import { ActivityType, ItemState } from '@generated/models';
import UserItemsList from '../../layouts/user-items-list/user-items-list';

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

  return (
    <div>
      <Tabs<ActivityType>
        tabs={activityTabs}
        selectedTab={selectedActivityType}
        onClick={(tab: ActivityType) => onSetActivityType(tab)}
      />
      {selectedActivityType === ActivityType.Reading && (
        <>
          <Tabs<ItemState>
            tabs={stateTabs}
            selectedTab={selectedStateType}
            onClick={(tab: ItemState) => onSetStateType(tab)}
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
        </>
      )}
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
