import { ApiProperty } from '@nestjs/swagger';
import {BookDto} from "../../books/dto/book.dto";

export class UserDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'user@email.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'Kate', description: 'name' })
  name: string;

  @ApiProperty({ example: true, description: 'account is activated' })
  isActivated: boolean;

  @ApiProperty({ type: [BookDto], isArray: true })
  booksInProgress: BookDto[];

  @ApiProperty({ type: [BookDto], isArray: true })
  booksCompleted: BookDto[];

  @ApiProperty({ type: [BookDto], isArray: true })
  booksPlanned: BookDto[];
}
