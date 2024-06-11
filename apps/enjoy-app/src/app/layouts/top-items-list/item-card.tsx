import React, { useMemo } from 'react';
import { css, Theme } from '@emotion/react';
import {
  columnContainerStyle,
  rowContainerStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { ButtonType } from '@global/utils/enum';
import { Button } from '@global/components/buttons';
import { useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { getKey, getUsersType, mapDtoToId, UsersActivityState } from './utils';
import { Item } from '@store/reducers/home-page-slice';
import { ActivityType, ItemState, UserDto } from '@generated/models';

interface Props {
  data: Item;
  index: number;
  activityType: ActivityType;
  onChangeItemState: (id: number, itemState: ItemState) => void;
  onOpenAuthModal: () => void;
}

function ItemCard({
  data,
  index,
  activityType,
  onChangeItemState,
  onOpenAuthModal,
}: Props) {
  const user: UserDto = useAppSelector((state: RootState) => state.userReducer);
  const itemId = data.id;

  const usersActivityState: UsersActivityState = useMemo(() => {
    return {
      inProgress: user.id
        ? mapDtoToId(user[getKey(activityType, ItemState.InProgress)])
        : [],
      completed: user.id
        ? mapDtoToId(user[getKey(activityType, ItemState.Completed)])
        : [],
      planned: user.id
        ? mapDtoToId(user[getKey(activityType, ItemState.Planned)])
        : [],
    };
  }, [user]);

  const onBtnClick = (itemState: ItemState) => {
    if (user.id) {
      onChangeItemState(itemId, itemState);
    } else {
      onOpenAuthModal();
    }
  };

  return (
    <li css={[rowContainerStyle, containerStyle, yCenteredStyle]}>
      <div css={(theme) => indexStyle(theme)}>{index + 1}</div>
      <div css={[columnContainerStyle, dataStyle]}>
        <p css={bookTitleStyle}>{`${data.author} ${data.title}`}</p>
        <p
          css={readersCountStyle}
        >{`${data.inProgress} ${getUsersType(activityType)}`}</p>
      </div>
      <div css={[columnContainerStyle, buttonsContainerStyle]}>
        <Button
          variant={
            usersActivityState.completed.includes(itemId)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => onBtnClick(ItemState.Completed)}
          disabled={false}
        >
          {'Done!'}
        </Button>
        <Button
          variant={
            usersActivityState.inProgress.includes(itemId)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => onBtnClick(ItemState.InProgress)}
          disabled={false}
        >
          {'Me too'}
        </Button>
        <Button
          variant={
            usersActivityState.planned.includes(itemId)
              ? ButtonType.PRIMARY
              : ButtonType.PRIMARY_OUTLINED
          }
          onClick={() => onBtnClick(ItemState.Planned)}
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
