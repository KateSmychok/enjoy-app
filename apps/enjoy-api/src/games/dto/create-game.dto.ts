import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({
    example: 'GTA V',
    description: 'title',
  })
  title: string;

  @ApiPropertyOptional({
    example: 'Action-adventure game',
    description: 'description',
  })
  description?: string;
}
