import { Module } from '@nestjs/common';
import { BookRatingService } from './book-rating.service';
import { BookRatingController } from './book-rating.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BookRating } from '../entities/BookRating';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BookRatingService],
  controllers: [BookRatingController],
  imports: [MikroOrmModule.forFeature([BookRating]), AuthModule],
})
export class BookRatingModule {}
