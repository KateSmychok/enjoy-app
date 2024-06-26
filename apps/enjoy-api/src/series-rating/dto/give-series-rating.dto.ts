import { ApiProperty } from '@nestjs/swagger';

export class GiveSeriesRatingDto {
  @ApiProperty({ example: 1, description: 'seriesId' })
  seriesId: number;

  @ApiProperty({ example: 10, description: 'value' })
  value: number;
}
