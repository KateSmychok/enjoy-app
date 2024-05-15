import {defineConfig} from "@mikro-orm/mysql";

export default defineConfig({
  host: process.env.MICRO_ORM_HOST,
  port: Number(process.env.MICRO_ORM_PORT),
  user: process.env.MICRO_ORM_USER,
  password: process.env.MICRO_ORM_PASSWORD,
  dbName: process.env.MICRO_ORM_DB_NAME,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  debug: true,
});
