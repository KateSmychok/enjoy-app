import { ApiProperty } from '@nestjs/swagger';

export class GiveGameRatingDto {
  @ApiProperty({ example: 1, description: 'gameId' })
  gameId: number;

  @ApiProperty({ example: 10, description: 'value' })
  value: number;
}
