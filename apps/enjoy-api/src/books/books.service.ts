import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Book } from '../entities/Book';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksMapper } from './book.mapper';
import { BookRating } from '../entities/BookRating';
import { GetBooksQuery } from './queries/get-books.query';
import { slice } from 'lodash';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: EntityRepository<Book>,
    @InjectRepository(BookRating)
    private readonly ratingRepository: EntityRepository<BookRating>,
    private readonly getBooksQuery: GetBooksQuery,
    private readonly booksMapper: BooksMapper,
    private em: EntityManager,
  ) {}

  async getAllBooks() {
    const books = await this.getBooksQuery.getAllBooks();
    return slice(books, 0, 250);
  }

  async getBooksByAuthor(author: string) {
    const books = await this.booksRepository.find({ author });
    return books.map(this.booksMapper.bookToDto);
  }

  async addNewBook(input: CreateBookDto) {
    if (!input.author || !input.title) {
      throw new HttpException(
        'Author or title not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = new Book({
      author: input.author,
      title: input.title,
      description: input.description,
    });

    await this.em.persistAndFlush(book);
    return this.booksMapper.bookToDto(book);
  }
}
