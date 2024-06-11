import React from 'react';
import ItemCard from './item-card';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { Item } from '@store/reducers/home-page-slice';
import {
  ActivityType,
  ChangeActivityStateDto,
  ItemState,
} from '@generated/models';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch } from '@store/hooks';
import { userSliceActions } from '@store/reducers/user-slice';

interface Props {
  items: Item[];
  activityType: ActivityType;
  onOpenAuthModal: () => void;
}

function TopItemsList({ items, activityType, onOpenAuthModal }: Props) {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const handleChangeItemState = async (id: number, itemState: ItemState) => {
    await client.profile.changeActivityState({
      id,
      itemState,
      activityType,
    } as ChangeActivityStateDto);
    const { data } = await client.profile.getUser();
    dispatch(userSliceActions.setUser(data));
  };

  return (
    <ul css={[fullWidthStyle, columnContainerStyle, yCenteredStyle]}>
      {items.map((i, index) => (
        <ItemCard
          key={i.id}
          data={i}
          index={index}
          activityType={activityType}
          onChangeItemState={handleChangeItemState}
          onOpenAuthModal={onOpenAuthModal}
        />
      ))}
    </ul>
  );
}

export default TopItemsList;
