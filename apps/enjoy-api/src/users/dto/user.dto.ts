import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from '../../books/dto/book.dto';
import {GameDto} from "../../games/dto/game.dto";
import {SeriesDto} from "../../series/dto/series.dto";

export class UserDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'user@email.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'Kate', description: 'name' })
  name: string;

  @ApiProperty({ example: true, description: 'account is activated' })
  isActivated: boolean;

  @ApiProperty({ isArray: true, type: BookDto })
  booksInProgress: BookDto[];

  @ApiProperty({ isArray: true, type: BookDto })
  booksCompleted: BookDto[];

  @ApiProperty({ isArray: true, type: BookDto })
  booksPlanned: BookDto[];

  @ApiProperty({ isArray: true, type: GameDto })
  gamesInProgress: GameDto[];

  @ApiProperty({ isArray: true, type: GameDto })
  gamesCompleted: GameDto[];

  @ApiProperty({ isArray: true, type: GameDto })
  gamesPlanned: GameDto[];

  @ApiProperty({ isArray: true, type: SeriesDto })
  seriesInProgress: SeriesDto[];

  @ApiProperty({ isArray: true, type: SeriesDto })
  seriesCompleted: SeriesDto[];

  @ApiProperty({ isArray: true, type: SeriesDto })
  seriesPlanned: SeriesDto[];
}
