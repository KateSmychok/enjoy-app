import { Injectable } from "@nestjs/common";
import { BookDto } from "./dto/book.dto";
import { Book } from "../entities/Book";

@Injectable()
export class BooksMapper {
  bookToDto(book: Book): BookDto {
    const dto = new BookDto();

    dto.id = book.id;
    dto.author = book.author;
    dto.title = book.title;
    dto.description = book.description;

    return dto;
  }
}
