import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from '../../books/dto/book.dto';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  roles: string;

  @ApiProperty({ type: [BookDto], isArray: true })
  booksInProgress: BookDto[];

  @ApiProperty({ type: [BookDto], isArray: true })
  booksCompleted: BookDto[];

  @ApiProperty({ type: [BookDto], isArray: true })
  booksPlanned: BookDto[];
}
