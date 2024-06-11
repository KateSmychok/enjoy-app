import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  @ApiOperation({ operationId: 'getAllBooks' })
  @ApiResponse({ status: 200, type: [BookDto] })
  async getAllBooks(): Promise<BookDto[]> {
    return this.booksService.getAllBooks();
  }

  @Get('/:author')
  @ApiOperation({ operationId: 'getAllBooksByAuthor' })
  @ApiResponse({ status: 200, type: [BookDto] })
  async getBooksByAuthor(@Param('author') author: string): Promise<BookDto[]> {
    return this.booksService.getBooksByAuthor(author);
  }

  @Post('/')
  @ApiOperation({ operationId: 'addBook' })
  @ApiResponse({ status: 200, type: BookDto })
  async addNewBook(@Body() body: CreateBookDto): Promise<BookDto> {
    return this.booksService.addNewBook(body);
  }
}
