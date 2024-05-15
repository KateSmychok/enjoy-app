import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ columnType: 'int', autoincrement: true, unique: true })
  id: number;

  @Property({ nullable: false })
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
