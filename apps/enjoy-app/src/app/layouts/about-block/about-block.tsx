import React from 'react';
import { css, Theme } from '@emotion/react';
import { columnContainerStyle, xCenteredStyle } from '@global/common-styles';
import readingMan from '@assets/pics/main-pic-reading.jpg';

function AboutBlock() {
  return (
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
  );
}

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

export default AboutBlock;
