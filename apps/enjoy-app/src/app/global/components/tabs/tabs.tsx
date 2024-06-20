import React from 'react';
import { css, Theme } from '@emotion/react';

export interface TabProps<T> {
  name: string;
  type: T;
}

interface Props<T> {
  tabs: TabProps<T>[];
  selectedTab: T;
  onSelect: (tab: T) => void;
  size: 's' | 'm' | 'l';
}

function Tabs<T>({ tabs, selectedTab, onSelect, size }: Props<T>) {
  return (
    <ul css={listStyle}>
      {tabs.map((tab, i) => {
        return (
          <li
            key={tab.name}
            css={[itemStyle, selectedTab === tab.type && itemActiveStyle]}
            onClick={() => onSelect(tab.type)}
          >
            <span css={(theme) => textStyle(theme, size)}>{tab.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

const listStyle = () => css`
  display: flex;
  list-style-type: none;
  margin-bottom: 48px;
`;

const itemStyle = () => css`
  width: fit-content;
  padding: 16px 24px;
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

const textStyle = (theme: Theme, size: 's' | 'm' | 'l') => css`
  ${size === 's' && theme.textStyles.titleS};
  ${size === 'm' && theme.textStyles.titleM};
  ${size === 'l' && theme.textStyles.titleL};
`;

const itemActiveStyle = (theme: Theme) => css`
  border-bottom: 3px solid ${theme.colours.primary};
  transform: scale(1.3);
`;

export default Tabs;
