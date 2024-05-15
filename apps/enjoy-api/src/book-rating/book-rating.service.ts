import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { GiveBookRatingDto } from "./dto/give-book-rating.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/mysql";
import { BookRating } from "../entities/BookRating";

@Injectable({ scope: Scope.REQUEST })
export class BookRatingService {
  constructor(
    @InjectRepository(BookRating)
    private readonly bookRatingRepository: EntityRepository<BookRating>,
    @Inject(REQUEST) private readonly request,
    private readonly em: EntityManager,
  ) {}

  async findUserBookRating(bookId: number) {
    const { id } = this.request.user;
    const existingRating = this.bookRatingRepository.findOne({ userId: id, bookId });
    return existingRating;
  }

  async giveBookRating(input: GiveBookRatingDto) {
    const { id } = this.request.user;
    const { bookId, value } = input;

    const existingRating = await this.findUserBookRating(bookId);

    if (existingRating) {
      existingRating.value = value;
      await this.em.persistAndFlush(existingRating);
      return existingRating;
    } else {
      const rating = new BookRating({
        userId: id,
        bookId,
        value,
      });
      await this.em.persistAndFlush(rating);
      return rating;
    }
  }
}
