import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { hash, compare } from 'bcryptjs';
import { User } from "../entities/User";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(input: CreateUserDto) {
    const user = await this.validateUser(input);
    return this.generateToken(user);
  }

  async register(input: CreateUserDto) {
    const existingUser = await this.usersService.getUserByEmail(input.email);
    if (existingUser) throw new HttpException('The user with this email exists', HttpStatus.BAD_REQUEST);

    const hashPassword = await hash(input.password, 5);
    const user = await this.usersService.createUser({ email: input.email, password: hashPassword });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(input: CreateUserDto) {
    const existingUser = await this.usersService.getUserByEmail(input.email);
    if (!existingUser) {
      throw new HttpException('The user not found', HttpStatus.NOT_FOUND);
    }

    const passwordsMatch = await compare(input.password, existingUser.password);
    if (passwordsMatch) {
      return existingUser;
    } else {
      throw new HttpException('The password is incorrect', HttpStatus.BAD_REQUEST);
    }
  }
}
