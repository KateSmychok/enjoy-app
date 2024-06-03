import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {MikroOrmModule } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ProfileModule } from './profile/profile.module';
import { BookRatingModule } from './book-rating/book-rating.module';
import { ConfigModule } from '@nestjs/config';
import { BaseEntity } from './entities/base.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    MikroOrmModule.forRoot({
      driver: MySqlDriver,
      entities: [BaseEntity],
      host: process.env.MIKRO_ORM_HOST,
      port: Number(process.env.MIKRO_ORM_PORT),
      user: process.env.MIKRO_ORM_USER,
      password: process.env.MIKRO_ORM_PASSWORD,
      dbName: process.env.MIKRO_ORM_DB_NAME,
      autoLoadEntities: true,
    } as any),
    UsersModule,
    AuthModule,
    BooksModule,
    ProfileModule,
    BookRatingModule,
  ],
  exports: [],
})
export class AppModule {}
