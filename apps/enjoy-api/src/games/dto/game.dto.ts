import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GameDto {
  @ApiProperty()
  id: number;

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
