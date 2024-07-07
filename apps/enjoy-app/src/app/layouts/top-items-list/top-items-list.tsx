import React, { useMemo } from 'react';
import ItemCard from './item-card';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import {
  ActivityType,
  ItemState,
  UserDto,
} from '@generated/models';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { userSliceActions } from '@store/reducers/user-slice';
import { topItemsSliceActions } from '@store/reducers/top-items-slice';
import { Item } from '@global/interfaces';
import { getKey, mapDtoToId, UsersActivityState } from './utils';
import { RootState } from '@store/store';

interface Props {
  items: Item[];
  activityType: ActivityType;
  onOpenAuthModal: () => void;
}

function TopItemsList({ items, activityType, onOpenAuthModal }: Props) {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const user: UserDto = useAppSelector((state: RootState) => state.userReducer);

  const usersActivityState: UsersActivityState = useMemo(() => {
    return user.id
      ? {
          inProgress: mapDtoToId(
            user[getKey(activityType, ItemState.InProgress)],
          ),
          completed: mapDtoToId(
            user[getKey(activityType, ItemState.Completed)],
          ),
          planned: mapDtoToId(user[getKey(activityType, ItemState.Planned)]),
        }
      : {
          inProgress: [],
          completed: [],
          planned: [],
        };
  }, [user, activityType]);

  const handleChangeItemState = async (id: number, itemState: ItemState) => {
    await client.profile.changeActivityState({
      id,
      itemState,
      activityType,
    });
    const { data } = await client.profile.getUser();
    dispatch(userSliceActions.setUser(data));

    if (itemState === ItemState.InProgress) {
      dispatch(
        topItemsSliceActions.changeCount({
          id,
          activityType,
          increase: !usersActivityState.inProgress.includes(id),
        }),
      );
    }
  };

  return (
    <ul css={[fullWidthStyle, columnContainerStyle, yCenteredStyle]}>
      {items.map((i, index) => (
        <ItemCard
          key={i.id}
          data={i}
          index={index}
          activityType={activityType}
          usersActivityState={usersActivityState}
          onChangeItemState={handleChangeItemState}
          onOpenAuthModal={onOpenAuthModal}
        />
      ))}
    </ul>
  );
}

export default TopItemsList;
