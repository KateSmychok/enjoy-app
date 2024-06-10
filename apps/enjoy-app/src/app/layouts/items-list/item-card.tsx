import React from 'react';
import { css, Theme } from '@emotion/react';
import {
  columnContainerStyle,
  rowContainerStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { ActivityType, ButtonType } from '@global/utils/enum';
import { Button } from '@global/components/buttons';
import { useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { getItemType, getUsersType } from './utils';
import { Item } from '@store/reducers/home-page-slice';

interface Props {
  data: Item;
  index: number;
  activityType: ActivityType;
}

function ItemCard({ data, index, activityType }: Props) {
  const user = useAppSelector((state: RootState) => state.userReducer);
  const itemType = getItemType(activityType);
  const usersType = getUsersType(activityType);

  const inProgress = user[`${itemType}InProgress`].map((i) => i.id);
  const completed = user[`${itemType}Completed`].map((i) => i.id);
  const planned = user[`${itemType}Planned`].map((i) => i.id);

  return (
    <li css={[rowContainerStyle, containerStyle, yCenteredStyle]}>
      <div css={(theme) => indexStyle(theme)}>{index + 1}</div>
      <div css={[columnContainerStyle, dataStyle]}>
        <p css={bookTitleStyle}>{`${data.author} ${data.title}`}</p>
        <p css={readersCountStyle}>{`${data.inProgress} ${usersType}`}</p>
      </div>
      <div css={[columnContainerStyle, buttonsContainerStyle]}>
        <Button
          variant={
            completed.includes(data.id)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => null}
          disabled={false}
        >
          {'Done!'}
        </Button>
        <Button
          variant={
            inProgress.includes(data.id)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => null}
          disabled={false}
        >
          {'Me too'}
        </Button>
        <Button
          variant={
            planned.includes(data.id)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => null}
          disabled={false}
        >
          {'For later'}
        </Button>
      </div>
    </li>
  );
}

const containerStyle = () => css`
  width: 70%;
  min-height: 214px;
  padding: 24px 34px;
  border-radius: 40px;
  box-shadow: 10px 10px 50px 0 rgba(25, 25, 25, 5%);
  gap: 24px;
  margin-bottom: 32px;
`;

const dataStyle = () => css`
  width: 80%;
`;

const bookTitleStyle = (theme: Theme) => css`
  ${theme.textStyles.titleS}
`;

const readersCountStyle = (theme: Theme) => css`
  ${theme.textStyles.bodyLarge};
  color: ${theme.colours.textSecondary};
`;

const indexStyle = (theme: Theme) => css`
  min-width: 46px;
  ${theme.textStyles.titleItalicXL}
`;

const buttonsContainerStyle = () => css`
  gap: 8px;
`;

export default ItemCard;
