import { migrationsList } from './apps/enjoy-api/src/migrations';
import { entities } from './apps/enjoy-api/src/entities/entities';
import { Migrator } from '@mikro-orm/migrations';

export default {
  entities: entities,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  extensions: [Migrator],
  migrations: {
    tableName: 'sch_migrations',
    migrationsList,
    dropTables: false,
    transactional: true,
    allOrNothing: true,
  },
  type: 'mysql',
};
