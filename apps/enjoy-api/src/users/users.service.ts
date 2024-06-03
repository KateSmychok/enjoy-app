import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, FindOptions } from '@mikro-orm/mysql';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/User';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UsersMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly usersMapper: UsersMapper,
    private readonly em: EntityManager,
  ) {}

  async getAllUsers() {
    const options: FindOptions<User, any, any> = {
      populate: ['booksInProgress', 'booksCompleted', 'booksPlanned'],
    };
    const users = await this.em.find(User, {}, options);
    return await Promise.all(users.map(this.usersMapper.userToDto));
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async createUser(input: CreateUserDto) {
    const { email, password, name } = input;
    if (!email || !password) {
      throw new HttpException(
        'Email or password not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User({
      email,
      name,
      password,
      roles: ['USER'], // hardcoded for new users with a role 'User'
    });

    await this.em.persistAndFlush(user);
    return user;
  }
}
