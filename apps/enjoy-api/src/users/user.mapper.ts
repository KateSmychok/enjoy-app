import { Injectable } from "@nestjs/common";
import { User } from "../entities/User";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UsersMapper {
  async userToDto(user: User): Promise<UserDto> {
    const dto = new UserDto();

    dto.id = user.id;
    dto.email = user.email;
    dto.password = user.password;
    dto.name = user.name;
    dto.roles = user.roles;

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

    return dto;
  }
}
