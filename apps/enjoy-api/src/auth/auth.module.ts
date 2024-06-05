import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersMapper } from '../users/user.mapper';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities/User';
import { Token } from '../entities/Token';
import { MailService } from './mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService, UsersMapper],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    MikroOrmModule.forFeature([User, Token]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
