import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Book } from "../entities/Book";
import { BookRating } from "../entities/BookRating";
import { BooksMapper } from "./book.mapper";
import { GetBooksQuery } from "./queries/get-books.query";

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksMapper, GetBooksQuery],
  imports: [
    MikroOrmModule.forFeature([Book, BookRating]),
  ],
  exports: [BooksService]
})
export class BooksModule {}
