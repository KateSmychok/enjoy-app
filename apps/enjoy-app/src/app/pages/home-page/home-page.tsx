import React from 'react';
import ReactDOM from 'react-dom';
import { css, Theme } from '@emotion/react';
import { BookDto } from '@generated/models';
import { withErrorBoundary } from '@global/utils/error-boundary';
import RetryPanel from '@global/components/retry-panel/retry-panel';
import { useHomePage } from './use-home-page';
import TopItemsList from '../../components/top-items-list';
import {
  columnContainerStyle,
  rowContainerStyle,
  spaceBetweenStyle,
  yCenteredStyle,
} from '@global/common-styles';
import readingMan from '@assets/pics/main-pic-reading.jpg';
import { Pagination } from '@global/components/pagination/pagination';
import { Modal } from '@global/components/modals/modal';
import AuthForm from '../../layouts/forms/auth-form/auth-form';

function HomePageInner() {
  const {
    isLoading,
    relevantBooks,
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
      <div css={[rowContainerStyle, spaceBetweenStyle, yCenteredStyle]}>
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
        <div css={pictureStyle}></div>
      </div>
      <div css={rowContainerStyle}>
        {!isLoading && (
          <div css={columnContainerStyle}>
            <TopItemsList<BookDto> items={relevantBooks} />
            <Pagination
              totalPages={totalPages}
              selectedPage={page}
              onSelect={onSetPage}
            />
          </div>
        )}
      </div>
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
  margin-bottom: 44px;
`;

const pictureStyle = () => css`
  background: url(${readingMan}) no-repeat;
  background-size: contain;
  width: 70%;
  height: 800px;
  margin-bottom: 60px;

  @media only screen and (max-width: 1536px) {
    background-size: auto 100%;
    height: 400px;
  }

  @media only screen and (max-width: 1024px) {
    background-size: auto 80%;
    height: 320px;
    margin-bottom: 0;
  }
`;

const aboutBlockStyle = (theme: Theme) => css`
  width: 50%;
  ${theme.textStyles.titleL};

  li {
    padding-bottom: 24px;
  }

  span {
    color: ${theme.colours.primary};
  }
`;

export default HomePage;
