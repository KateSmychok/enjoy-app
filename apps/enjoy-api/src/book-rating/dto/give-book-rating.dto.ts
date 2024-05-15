import { ApiProperty } from "@nestjs/swagger";

export class GiveBookRatingDto {
  @ApiProperty({ example: 1, description: 'bookId' })
  bookId: number;

  @ApiProperty({ example: 10, description: 'value' })
  value: number;
}
