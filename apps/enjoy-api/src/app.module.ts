import { Module } from "@nestjs/common";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { MySqlDriver } from "@mikro-orm/mysql";
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ProfileModule } from './profile/profile.module';
import { BookRatingModule } from './book-rating/book-rating.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MikroOrmModule.forRoot({
      driver: MySqlDriver,
      entities: ['./dist/entities/base.entity'],
      entitiesTs: ['./src/entities/base.entity'],
      host: process.env.MIKRO_ORM_HOST,
      port: Number(process.env.MIKRO_ORM_PORT),
      user: process.env.MIKRO_ORM_USER,
      password: process.env.MIKRO_ORM_PASSWORD,
      dbName: process.env.MIKRO_ORM_DB_NAME,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    ProfileModule,
    BookRatingModule,
  ],
  exports: [],
})
export class AppModule {

}
