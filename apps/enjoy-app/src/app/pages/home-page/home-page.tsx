import React from 'react';
import { css, Theme } from '@emotion/react';
import { BookDto } from '@generated/models';
import { withErrorBoundary } from '@global/utils/error-boundary';
import RetryPanel from '@global/components/retry-panel/retry-panel';
import { useHomePage } from './use-home-page';
import TopItemsList from '../../components/top-items-list';
import {
  columnContainerStyle,
  rowContainerStyle,
  yCenteredStyle,
} from '@global/common-styles';
import readingPeople from '@assets/pics/reading.jpeg';
import { Pagination } from '@global/components/pagination/pagination';

function HomePageInner() {
  const { isLoading, relevantBooks, page, totalPages, onSetPage } = useHomePage();
  return (
    <>
      <div css={[columnContainerStyle, yCenteredStyle]}>
        <p css={(theme) => [containerStyle, titleStyle(theme)]}>
          {'Now reading'}
        </p>
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
    </>
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
  background: url(${readingPeople}) no-repeat;
  background-size: auto 110%;
  width: 100%;
  max-width: 1700px;
  height: 440px;
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

const titleStyle = (theme: Theme) => css`
  ${theme.textStyles.titleL}
`;

export default HomePage;
