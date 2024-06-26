import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeriesDto {
  @ApiProperty({
    example: 'The Office',
    description: 'title',
  })
  title: string;

  @ApiPropertyOptional({
    example:
      'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, tedium and romance.',
    description: 'description',
  })
  description?: string;
}
