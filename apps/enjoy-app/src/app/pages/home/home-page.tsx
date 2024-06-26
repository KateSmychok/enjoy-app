import React from 'react';
import ReactDOM from 'react-dom';
import { withErrorBoundary } from '@global/utils/error-boundary';
import { useHomePage } from './use-home-page';
import TopItemsList from '../../layouts/top-items-list/top-items-list';
import {
  columnContainerStyle,
  fullWidthStyle,
  xCenteredStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { Pagination } from '@global/components/pagination/pagination';
import { Modal } from '@global/components/modals/modal';
import AuthForm from '../../layouts/forms/auth-form/auth-form';
import AboutBlock from '../../layouts/about-block/about-block';
import RetryPanel from '../../layouts/retry-panel/retry-panel';
import { ActivityType } from '@generated/models';
import { activityTabs } from '@global/constants';
import Tabs from '@global/components/tabs/tabs';

function HomePageInner() {
  const {
    selectedActivityType,
    isLoading,
    relevantItems,
    page,
    totalPages,
    onSetPage,
    mode,
    isLoggedIn,
    isAuthModalOpened,
    onCloseAuthModal,
    onOpenAuthModal,
    onSetActivityType,
  } = useHomePage();
  return (
    <div id={'home-page'}>
      <AboutBlock />
      <div css={xCenteredStyle}>
        <Tabs<ActivityType>
          tabs={activityTabs}
          selectedTab={selectedActivityType}
          onSelect={(tab: ActivityType) => onSetActivityType(tab)}
          size={'m'}
        />
      </div>
      {!isLoading && (
        <div css={[columnContainerStyle, yCenteredStyle, fullWidthStyle]}>
          <TopItemsList
            items={relevantItems}
            activityType={selectedActivityType}
            onOpenAuthModal={onOpenAuthModal}
          />
          <Pagination
            totalPages={totalPages}
            selectedPage={page}
            onSelect={onSetPage}
          />
        </div>
      )}
      {isAuthModalOpened &&
        ReactDOM.createPortal(
          <Modal onClose={onCloseAuthModal}>
            <AuthForm />
          </Modal>,
          document.getElementById('home-page'),
        )}
    </div>
  );
}

const HomePage = () =>
  withErrorBoundary(
    <HomePageInner />,
    (retryProps) => <RetryPanel {...retryProps} />,
    'main',
  );

export default HomePage;
