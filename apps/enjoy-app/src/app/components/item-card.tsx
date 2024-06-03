import React from 'react';
import { Item } from './top-items-list';
import { css, Theme } from '@emotion/react';
import { rowContainerStyle, yCenteredStyle } from '@global/common-styles';

interface Props {
  data: Item;
  index: number;
}

function ItemCard({ data, index }: Props) {
  return (
    <li css={[rowContainerStyle, containerStyle, yCenteredStyle]}>
      <div css={(theme) => indexStyle(theme)}>{index + 1}</div>
      {`${data.author} ${data.title} - ${data.inProgress} ${data.inProgress === 1 ? 'reader' : 'readers'}`}
    </li>
  );
}

const containerStyle = () => css`
  gap: 24px;
  margin-bottom: 32px;
`;

const indexStyle = (theme: Theme) => css`
  min-width: 46px;
  ${theme.textStyles.titleL}
`;

export default ItemCard;
