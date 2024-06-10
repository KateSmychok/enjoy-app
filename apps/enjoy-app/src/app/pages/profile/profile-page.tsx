import {withErrorBoundary} from "@global/utils/error-boundary";
import RetryPanel from "@global/components/retry-panel/retry-panel";
import React from "react";
import Tabs from "@global/components/tabs/tabs";
import {ActivityType, StateType} from "@global/utils/enum";
import {useProfilePage} from "./use-profile-page";
import {columnContainerStyle, fullWidthStyle, yCenteredStyle} from "@global/common-styles";
import TopItemsList from "../../layouts/items-list/top-items-list";
import {Pagination} from "@global/components/pagination/pagination";
import {activityTabs, stateTabs} from "./constants";

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
    <Tabs<ActivityType> tabs={activityTabs} selectedTab={selectedActivityType} onClick={(tab: ActivityType) => onSetActivityType(tab)}/>
    {selectedActivityType === ActivityType.Reading && (
      <>
        <Tabs<StateType> tabs={stateTabs} selectedTab={selectedStateType} onClick={(tab: StateType) => onSetStateType(tab)}/>
        <div css={[columnContainerStyle, yCenteredStyle, fullWidthStyle]}>
          <TopItemsList items={relevantItems} activityType={selectedActivityType} />
          <Pagination
            totalPages={totalPages}
            selectedPage={page}
            onSelect={onSetPage}
          />
        </div>
      </>
    )}
  </div>
  )}

const ProfilePage = () =>
  withErrorBoundary(
    <ProfilePageInner />,
    (retryProps) => <RetryPanel {...retryProps} />,
    'profile',
  );

export default ProfilePage;
