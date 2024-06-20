import { Module } from '@nestjs/common';
import { BooksRatingService } from './books-rating.service';
import { BooksRatingController } from './books-rating.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BooksRating } from '../entities/BooksRating';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BooksRatingService],
  controllers: [BooksRatingController],
  imports: [MikroOrmModule.forFeature([BooksRating]), AuthModule],
})
export class BooksRatingModule {}
