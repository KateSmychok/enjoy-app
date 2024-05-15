import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Book } from "./Book";

export interface UserInput {
  email: string;
  name: string;
  password: string;
  roles: string[];
}

@Entity({tableName: 'users'})
export class User extends BaseEntity {
  constructor(input: UserInput) {
    super();

    this.email = input.email;
    this.name = input.name;
    this.password = input.password;
    this.roles = input.roles.join(',');
  }

  @Property({ nullable: false })
  email: string;

  @Property({ nullable: false })
  password: string;

  @Property({ nullable: true })
  name: string;

  @Property({ nullable: true })
  roles: string;

  @ManyToMany({ entity: () => Book, inversedBy: b => b.readersInProgress, owner: true, pivotTable: 'users_books_in_progress', joinColumn: 'user_id', inverseJoinColumn: 'book_id', hidden: true })
  booksInProgress = new Collection<Book>(this);

  @ManyToMany({ entity: () => Book, inversedBy: b => b.readersCompleted, owner: true, pivotTable: 'users_books_completed', joinColumn: 'user_id', inverseJoinColumn: 'book_id', hidden: true })
  booksCompleted = new Collection<Book>(this);

  @ManyToMany({ entity: () => Book, inversedBy: b => b.readersPlanned, owner: true, pivotTable: 'users_books_planned', joinColumn: 'user_id', inverseJoinColumn: 'book_id', hidden: true })
  booksPlanned = new Collection<Book>(this);
}
