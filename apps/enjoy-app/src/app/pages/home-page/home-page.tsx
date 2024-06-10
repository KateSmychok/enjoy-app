import React from 'react';
import ReactDOM from 'react-dom';
import { css, Theme } from '@emotion/react';
import { withErrorBoundary } from '@global/utils/error-boundary';
import RetryPanel from '@global/components/retry-panel/retry-panel';
import { useHomePage } from './use-home-page';
import TopItemsList from '../../layouts/items-list/top-items-list';
import {
  columnContainerStyle,
  fullWidthStyle,
  xCenteredStyle,
  yCenteredStyle,
} from '@global/common-styles';
import readingMan from '@assets/pics/main-pic-reading.jpg';
import { Pagination } from '@global/components/pagination/pagination';
import { Modal } from '@global/components/modals/modal';
import AuthForm from '../../layouts/forms/auth-form/auth-form';

function HomePageInner() {
  const {
    activityType,
    isLoading,
    relevantItems,
    page,
    totalPages,
    onSetPage,
    mode,
    isLoggedIn,
    isAuthModalOpened,
    onCloseAuthModal,
  } = useHomePage();
  return (
    <div id={'home-page'}>
      <div css={[columnContainerStyle, xCenteredStyle, containerStyle]}>
        <ul css={(theme) => aboutBlockStyle(theme)}>
          <li>
            <p>
              <span>{'Enjoy'}</span>
              {' helps to choose an exciting book, series or game'}
            </p>
          </li>
          <li>
            <p>
              <span>{'Enjoy'}</span>
              {
                ' lets you know what is trending among your friends and in the whole world'
              }
            </p>
          </li>
          <li>
            <p>
              <span>{'Enjoy'}</span>
              {' connects people with similar interests'}
            </p>
          </li>
        </ul>
      </div>
      <div
        css={(theme) => [
          itemsListTitleStyle(theme),
          columnContainerStyle,
          yCenteredStyle,
        ]}
      >
        {'Reading now'}
      </div>
      {!isLoading && (
        <div css={[columnContainerStyle, yCenteredStyle, fullWidthStyle]}>
          <TopItemsList items={relevantItems} activityType={activityType} />
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

const containerStyle = () => css`
  position: relative;
  background: url(${readingMan}) no-repeat top -100px right 0;
  background-size: contain;
  width: 100%;
  height: 800px;

  @media only screen and (max-width: 1280px) {
    background-size: 80%;
    height: 600px;
  }

  @media only screen and (max-width: 1024px) {
    background-size: 60%;
    height: 500px;
    background-position: top 0 right 0;
  }

  @media only screen and (max-width: 768px) {
    background: none;
    height: 400px;
  }
`;

const itemsListTitleStyle = (theme: Theme) => css`
  width: 540px;
  margin: 0 auto 60px;
  ${theme.textStyles.titleL};

  :after {
    content: '';
    width: 100%;
    height: 6px;
    background-color: ${theme.colours.primary};
  }

  @media only screen and (max-width: 540px) {
    width: 100%;
  }
`;

const aboutBlockStyle = (theme: Theme) => css`
  width: 50%;
  ${theme.textStyles.titleM};

  li {
    padding-bottom: 24px;
  }

  span {
    color: ${theme.colours.primary};
  }

  @media only screen and (max-width: 1280px) {
    ${theme.textStyles.bodyLarge};
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default HomePage;
