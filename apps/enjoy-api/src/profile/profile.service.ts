import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope, UnauthorizedException,
} from '@nestjs/common';
import { ProcessBookDto } from './dto/process-book.dto';
import { BookAction, BookType } from '../utils/enum';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entities/User';
import { EntityManager, EntityRepository, FindOptions } from '@mikro-orm/mysql';
import { Book } from '../entities/Book';
import { UsersMapper } from '../users/user.mapper';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Book)
    private readonly booksRepository: EntityRepository<Book>,
    private readonly usersMapper: UsersMapper,
    private readonly em: EntityManager,
    @Inject(REQUEST)
    private readonly request,
  ) {}

  async getUserProfile() {
    const { email } = this.request.user;

    if (!email) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    const options: FindOptions<User, any, any> = {
      populate: ['booksInProgress', 'booksCompleted', 'booksPlanned'],
    };

    const user = await this.em.findOneOrFail(User, { email }, options);
    return await this.usersMapper.userToDto(user);
  }


  async processBook(input: ProcessBookDto) {
    const { id } = this.request.user;
    const { bookId, type, action } = input;
    if (!bookId || !type || !action) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneOrFail({ id });
    const book = await this.booksRepository.findOneOrFail({ id: bookId });

    if (type === BookType.InProgress) {
      await user.booksInProgress.init();
      action === BookAction.Add
        ? user.booksInProgress.add(book)
        : user.booksInProgress.remove(book);
    }

    if (type === BookType.Completed) {
      await user.booksCompleted.init();
      action === BookAction.Add
        ? user.booksCompleted.add(book)
        : user.booksCompleted.remove(book);
    }

    if (type === BookType.Planned) {
      await user.booksPlanned.init();
      action === BookAction.Add
        ? user.booksPlanned.add(book)
        : user.booksPlanned.remove(book);
    }
    await this.em.flush();
  }
}
