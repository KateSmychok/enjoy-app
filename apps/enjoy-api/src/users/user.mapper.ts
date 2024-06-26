import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersMapper {
  async userToDto(user: User): Promise<UserDto> {
    const dto = new UserDto();

    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.isActivated = user.isActivated;

    const booksInProgress = await user.booksInProgress.init();
    dto.booksInProgress = Array.from(booksInProgress).map((b) => ({
      id: b.id,
      author: b.author,
      title: b.title,
    }));

    const booksCompleted = await user.booksCompleted.init();
    dto.booksCompleted = Array.from(booksCompleted).map((b) => ({
      id: b.id,
      author: b.author,
      title: b.title,
    }));

    const booksPlanned = await user.booksPlanned.init();
    dto.booksPlanned = Array.from(booksPlanned).map((b) => ({
      id: b.id,
      author: b.author,
      title: b.title,
    }));

    const gamesInProgress = await user.gamesInProgress.init();
    dto.gamesInProgress = Array.from(gamesInProgress).map((g) => ({
      id: g.id,
      title: g.title,
    }));

    const gamesCompleted = await user.gamesCompleted.init();
    dto.gamesCompleted = Array.from(gamesCompleted).map((g) => ({
      id: g.id,
      title: g.title,
    }));

    const gamesPlanned = await user.gamesPlanned.init();
    dto.gamesPlanned = Array.from(gamesPlanned).map((g) => ({
      id: g.id,
      title: g.title,
    }));

    const seriesInProgress = await user.seriesInProgress.init();
    dto.seriesInProgress = Array.from(seriesInProgress).map((s) => ({
      id: s.id,
      title: s.title,
    }));

    const seriesCompleted = await user.seriesCompleted.init();
    dto.seriesCompleted = Array.from(seriesCompleted).map((s) => ({
      id: s.id,
      title: s.title,
    }));

    const seriesPlanned = await user.seriesPlanned.init();
    dto.seriesPlanned = Array.from(seriesPlanned).map((s) => ({
      id: s.id,
      title: s.title,
    }));

    return dto;
  }
}
