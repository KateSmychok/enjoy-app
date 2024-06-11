import { css, Theme } from '@emotion/react';
import { ErrorBoundary } from '@global/utils/error-boundary';
import { AppRoutes } from './routes';
import Header from './layouts/header/header';
import { useApp } from './use-app';
import RetryPanel from '@global/components/retry-panel/retry-panel';

export const App = () => {
  useApp();

  return (
    <div css={(theme) => containerStyles(theme)}>
      <Header />
      <main css={mainStyles}>
        <div>
          <ErrorBoundary fallback={RetryPanel}>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

const containerStyles = (theme: Theme) => css`
  font-family: ${theme.fontFamilies.sansSerif};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colours.background};
`;

const mainStyles = () => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 0;
  position: relative;

  & > div {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 2048px) {
      width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 1280px) {
      width: calc(100vw - 40px);
    }
  }
`;

export default App;
