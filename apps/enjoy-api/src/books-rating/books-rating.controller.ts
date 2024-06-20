import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksRatingService } from './books-rating.service';
import { GiveBookRatingDto } from './dto/give-book-rating.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'books-rating' })
@ApiTags('books-rating')
export class BooksRatingController {
  constructor(private readonly bookRatingService: BooksRatingService) {}

  @Post('/')
  @ApiOperation({ operationId: 'giveBookRating' })
  @ApiResponse({ status: 200 })
  async giveBookRating(@Body() body: GiveBookRatingDto) {
    return this.bookRatingService.giveBookRating(body);
  }
}
