import {css, Theme} from '@emotion/react';
import {ErrorBoundary} from "./global/utils/error-boundary";

export const App = () => {
  return (
    <div css={(theme) => containerStyles(theme)}>
      <main css={mainStyles}>
        <div>
          <ErrorBoundary fallback={() => null}>
            <h1>{'Hi'}</h1>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
};

const containerStyles = (theme: Theme) => css`
  ${theme.textStyles.summaryText};
  font-family: ${theme.fontFamilies.sansSerif};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-left: calc(100vw - 100%);

  & > div {
    display: flex;
    flex-direction: column;
    background-color: ${theme.colours.backgroundNonActive};
    margin-left: calc(100% - 100vw);
    padding-left: calc(100vw - 100%);
  }

  & > div > div {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;

    @media only screen and (max-width: 1921px) {
      width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 1200px) {
      width: calc(100vw - 40px);
    }
  }
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

    @media only screen and (max-width: 1921px) {
      width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 1200px) {
      width: calc(100vw - 40px);
    }
  }
`;

export default App;
