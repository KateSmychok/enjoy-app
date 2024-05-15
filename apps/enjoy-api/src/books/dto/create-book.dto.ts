import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({example: 'J.K.Rowling', description: 'author'})
  author: string;

  @ApiProperty({example: 'Harry Potter and the Prisoner of Azkaban', description: 'title'})
  title: string;

  @ApiPropertyOptional({example: 'The 3rd book about the magical world', description: 'description'})
  description?: string;
}
