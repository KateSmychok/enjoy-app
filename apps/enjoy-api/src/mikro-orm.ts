import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { entities } from './entities/entities';

export async function init(debug = false) {
  const orm = await MikroORM.init<MySqlDriver>({
    entities,
    debug,
  });

  return orm;
}
