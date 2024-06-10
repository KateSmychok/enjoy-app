import React from 'react';
import ItemCard from './item-card';
import {
  columnContainerStyle,
  fullWidthStyle,
  yCenteredStyle,
} from '@global/common-styles';
import { Item } from '@store/reducers/home-page-slice';
import { ActivityType } from '@global/utils/enum';

interface Props {
  items: Item[];
  activityType: ActivityType;
}

function TopItemsList({ items, activityType }: Props) {
  return (
    <ul css={[fullWidthStyle, columnContainerStyle, yCenteredStyle]}>
      {items.map((i, index) => (
        <ItemCard
          key={i.id}
          data={i}
          index={index}
          activityType={activityType}
        />
      ))}
    </ul>
  );
}

export default TopItemsList;
