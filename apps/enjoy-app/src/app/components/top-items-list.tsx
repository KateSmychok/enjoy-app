import React from 'react';
import ItemCard from './item-card';

interface Props<T> {
  items: T[];
}

export interface Item {
  id: number;
  title: string;
  author?: string;
  rating?: number;
  inProgress?: number;
  completed?: number;
  planned?: number;
}

function TopItemsList<T extends Item>({ items }: Props<T>) {
  return (
    <ul>
      {items.map((i, index) => (
        <ItemCard key={i.id} data={i} index={index} />
      ))}
    </ul>
  );
}

export default TopItemsList;
