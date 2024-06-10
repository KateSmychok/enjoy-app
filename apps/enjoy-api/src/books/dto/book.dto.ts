import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  rating?: number;

  @ApiPropertyOptional()
  inProgress?: number;

  @ApiPropertyOptional()
  completed?: number;

  @ApiPropertyOptional()
  planned?: number;
}
