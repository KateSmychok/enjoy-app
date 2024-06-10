import React from 'react';
import {css, Theme} from '@emotion/react';

export interface TabProps<T> {
  name: string;
  type: T;
}

interface Props<T> {
  tabs: TabProps<T>[];
  selectedTab: T;
  onClick: (tab: T) => void;
}

function Tabs<T>({ tabs, selectedTab, onClick }: Props<T>) {
  return (
    <ul css={listStyle}>
      {tabs.map((tab, i) => {
        return (
          <li
            key={tab.name}
            css={[itemStyle, selectedTab === tab.type && itemActiveStyle]}
            onClick={() => onClick(tab.type)}
          >
            <span css={textStyle}>{tab.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

const listStyle = () => css`
  width: 100%;
  display: flex;
  list-style-type: none;
`;

const itemStyle = () => css`
  width: fit-content;
  padding: 16px;
  margin-right: 24px;
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const textStyle = (theme: Theme) => css`
  ${theme.textStyles.bodyLarge};
`;

const itemActiveStyle = (theme: Theme) => css`
  border-bottom: 3px solid ${theme.colours.primary};
`;

export default Tabs;
