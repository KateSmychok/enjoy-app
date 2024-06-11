import { ApiProperty } from '@nestjs/swagger';
import { ActivityType, ItemState } from '@enum';

export class ChangeActivityStateDto {
  @ApiProperty({ example: 1, description: 'id' })
  id: number;

  @ApiProperty({
    example: 'InProgress',
    description: 'item state',
    enum: ItemState,
    enumName: 'ItemState',
  })
  itemState: ItemState;

  @ApiProperty({
    example: 'Reading',
    description: 'activity type',
    enum: ActivityType,
    enumName: 'ActivityType',
  })
  activityType: ActivityType;
}
