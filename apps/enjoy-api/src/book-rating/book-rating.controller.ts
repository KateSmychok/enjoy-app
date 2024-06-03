import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookRatingService } from './book-rating.service';
import { GiveBookRatingDto } from './dto/give-book-rating.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'book-rating' })
@ApiTags('book-rating')
export class BookRatingController {
  constructor(private readonly bookRatingService: BookRatingService) {}

  @Post('/')
  @ApiOperation({ operationId: 'giveBookRating' })
  @ApiResponse({ status: 200 })
  async giveBookRating(@Body() body: GiveBookRatingDto) {
    return this.bookRatingService.giveBookRating(body);
  }
}
