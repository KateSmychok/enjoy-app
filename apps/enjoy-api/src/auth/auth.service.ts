import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { AuthUserInputDto } from './dto/auth-user-input.dto';
import { UsersService } from '../users/users.service';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { v4 } from 'uuid';
import { User } from '../entities/User';
import { Token } from '../entities/Token';
import { environment } from '../environments/environment';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UsersMapper } from '../users/user.mapper';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailService: MailService,
    private usersMapper: UsersMapper,
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: EntityRepository<Token>,
  ) {}

  async register(input: AuthUserInputDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findOne({
      email: input.email,
    });
    if (existingUser) {
      throw new HttpException(
        'The user with this email exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await hash(input.password, 5);
    const activationLink = v4();

    const user = await this.usersService.createUser({
      email: input.email,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      user.email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );
    return await this.generateTokens(user);
  }

  private async validateUser(input: AuthUserInputDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: input.email,
    });

    if (!existingUser) {
      throw new HttpException('The user not found', HttpStatus.NOT_FOUND);
    }

    if (!existingUser.isActivated) {
      throw new HttpException(
        'The email is not confirmed',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordsMatch = await compare(input.password, existingUser.password);
    if (!passwordsMatch) {
      throw new HttpException(
        'The password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    return existingUser;
  }

  async login(input: AuthUserInputDto): Promise<AuthResponseDto> {
    const user: User = await this.validateUser(input);
    return await this.generateTokens(user);
  }

  async logout(token: string) {
    await this.removeToken(token);
  }

  async activateLink(activationLink: string) {
    const user = await this.userRepository.findOne({ activationLink });
    if (!user) {
      throw new HttpException('The user not found', HttpStatus.NOT_FOUND);
    }

    user.isActivated = true;
    await this.em.persistAndFlush(user);
  }

  private async generateTokens(user: User): Promise<AuthResponseDto> {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: environment.jwtAccessSecret,
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: environment.jwtRefreshSecret,
      expiresIn: '60d',
    });
    await this.saveToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      user: await this.usersMapper.userToDto(user),
    };
  }

  private async saveToken(userId: number, refreshToken: string) {
    const existingToken = await this.tokenRepository.findOne({ userId });
    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      await this.em.persistAndFlush(existingToken);
    } else {
      const token = new Token({
        userId,
        refreshToken,
      });
      await this.em.persistAndFlush(token);
    }
  }

  private async removeToken(refreshToken: string) {
    const existingToken = await this.tokenRepository.findOne({ refreshToken });
    if (existingToken) {
      await this.em.removeAndFlush(existingToken);
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    if (!refreshToken) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    const userData = this.validateRefreshToken(refreshToken);
    const existingToken = await this.tokenRepository.findOne({ refreshToken });
    if (!userData || !existingToken) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    const user: User = await this.userRepository.findOne({
      id: existingToken.userId,
    });
    return await this.generateTokens(user);
  }

  private validateRefreshToken(refreshToken: string) {
    return this.jwtService.verify(refreshToken, {
      secret: environment.jwtRefreshSecret,
    });
  }
}
