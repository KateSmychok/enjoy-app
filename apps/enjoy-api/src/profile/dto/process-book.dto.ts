import { ApiProperty } from "@nestjs/swagger";
import { BookAction, BookType } from "../../utils/enum";

export class ProcessBookDto {
  @ApiProperty({example: 1, description: 'bookId'})
  bookId: number;

  @ApiProperty({example: 'InProgress', description: 'book type', enum: BookType, enumName: 'BookType' })
  type: string;

  @ApiProperty({example: 'add', description: 'add or remove', enum: BookAction, enumName: 'BookAction'})
  action: string;
}
