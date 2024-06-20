import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Book } from '../entities/Book';
import { BooksRating } from '../entities/BooksRating';
import { BooksMapper } from './book.mapper';
import { GetBooksQuery } from './queries/get-books.query';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksMapper, GetBooksQuery],
  imports: [MikroOrmModule.forFeature([Book, BooksRating])],
  exports: [BooksService],
})
export class BooksModule {}
