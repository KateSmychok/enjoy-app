import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "../entities/User";
import { Book } from "../entities/Book";
import { UsersMapper } from "../users/user.mapper";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UsersMapper],
  imports: [
    MikroOrmModule.forFeature([User, Book]),
    AuthModule
  ]
})
export class ProfileModule {}
