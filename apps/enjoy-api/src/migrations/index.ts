import { Migration20240619170612 } from './Migration20240619170612';

export const migrationsList = [Migration20240619170612].map((x) => ({
  class: x,
  name: x.name + '.ts',
}));
