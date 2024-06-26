import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, FindOptions } from '@mikro-orm/mysql';
import { REQUEST } from '@nestjs/core';
import { User } from '../entities/User';
import { Book } from '../entities/Book';
import { Game } from '../entities/Game';
import { Series } from '../entities/Series';
import { UsersMapper } from '../users/user.mapper';
import { ChangeActivityStateDto } from './dto/change-activity-state.dto';
import { getItemState } from './utils';
import { UserBooksType, UserGamesType, UserSeriesType } from '../utils/types';
import { ActivityType } from '@enum';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Book)
    private readonly booksRepository: EntityRepository<Book>,
    @InjectRepository(Game)
    private readonly gamesRepository: EntityRepository<Game>,
    @InjectRepository(Series)
    private readonly seriesRepository: EntityRepository<Series>,
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

  async changeActivityState(input: ChangeActivityStateDto) {
    const userFromReq = this.request.user;
    const { id, itemState, activityType } = input;

    if (!id || !itemState || !activityType) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneOrFail({
      id: userFromReq.id,
    });

    if (activityType === ActivityType.Reading) {
      const key = ('books' + getItemState(itemState)) as UserBooksType;
      const books = await user[key].init();
      const book = await this.booksRepository.findOneOrFail({ id });

      if (
        Array.from(books)
          .map((i) => i.id)
          .includes(id)
      ) {
        books.remove(book);
      } else {
        books.add(book);
      }
    }

    if (activityType === ActivityType.Playing) {
      const key = ('games' + getItemState(itemState)) as UserGamesType;
      const games = await user[key].init();
      const game = await this.gamesRepository.findOneOrFail({ id });

      if (
        Array.from(games)
          .map((i) => i.id)
          .includes(id)
      ) {
        games.remove(game);
      } else {
        games.add(game);
      }
    }

    if (activityType === ActivityType.Watching) {
      const key = ('series' + getItemState(itemState)) as UserSeriesType;
      const series = await user[key].init();
      const item = await this.seriesRepository.findOneOrFail({ id });

      if (
        Array.from(series)
          .map((i) => i.id)
          .includes(id)
      ) {
        series.remove(item);
      } else {
        series.add(item);
      }
    }
    await this.em.flush();
  }
}
