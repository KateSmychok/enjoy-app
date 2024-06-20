import React from 'react';
import UserItemCard from './user-item-card';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import {
  ActivityType,
  ChangeActivityStateDto,
  ItemState,
} from '@generated/models';
import { useApiClient } from '@global/modules/api-client';
import { Item } from '@global/interfaces';

interface Props {
  items: Item[];
  activityType: ActivityType;
  onOpenAuthModal: () => void;
}

function UserItemsList({ items, activityType, onOpenAuthModal }: Props) {
  const client = useApiClient();

  const handleChangeItemState = (id: number, itemState: ItemState) => {
    client.profile.changeActivityState({
      id,
      itemState,
      activityType,
    } as ChangeActivityStateDto);
  };

  return (
    <ul css={[fullWidthStyle, columnContainerStyle, yCenteredStyle]}>
      {items.map((i, index) => (
        <UserItemCard
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

export default UserItemsList;
