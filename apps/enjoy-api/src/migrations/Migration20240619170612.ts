import { Migration } from '@mikro-orm/migrations';

export class Migration20240619170612 extends Migration {
  async up(): Promise<void> {
    // Users
    this.addSql(
      'create table `users` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null, `password` varchar(255) not null, `name` varchar(255)  not null, `is_activated` tinyint(1) null, `activation_link` varchar(255) null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );

    // Token
    this.addSql(
      'create table `tokens` (`id` int unsigned not null auto_increment primary key, `user_id` int not null, `refresh_token` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );

    // Books
    this.addSql(
      'create table `books` (`id` int unsigned not null auto_increment primary key, `author` varchar(255) not null, `title` varchar(255) not null, `description` varchar(255) null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `books_rating` (`id` int unsigned not null auto_increment primary key, `book_id` int not null, `user_id` int not null, `value` int not null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `users_books_in_progress` (`user_id` int unsigned not null, `book_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_books_in_progress` add index `users_books_in_progress_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_books_in_progress` add index `users_books_in_progress_book_id_index`(`book_id`);',
    );
    this.addSql(
      'alter table `users_books_in_progress` add primary key `users_books_in_progress_pkey`(`user_id`, `book_id`);',
    );
    this.addSql(
      'alter table `users_books_in_progress` add constraint `users_books_in_progress_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_books_in_progress` add constraint `users_books_in_progress_book_id_foreign` foreign key (`book_id`) references `books` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_books_completed` (`user_id` int unsigned not null, `book_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_books_completed` add index `users_books_completed_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_books_completed` add index `users_books_completed_book_id_index`(`book_id`);',
    );
    this.addSql(
      'alter table `users_books_completed` add primary key `users_books_completed_pkey`(`user_id`, `book_id`);',
    );
    this.addSql(
      'alter table `users_books_completed` add constraint `users_books_completed_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_books_completed` add constraint `users_books_completed_book_id_foreign` foreign key (`book_id`) references `books` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_books_planned` (`user_id` int unsigned not null, `book_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_books_planned` add index `users_books_planned_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_books_planned` add index `users_books_planned_book_id_index`(`book_id`);',
    );
    this.addSql(
      'alter table `users_books_planned` add primary key `users_books_planned_pkey`(`user_id`, `book_id`);',
    );
    this.addSql(
      'alter table `users_books_planned` add constraint `users_books_planned_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_books_planned` add constraint `users_books_planned_book_id_foreign` foreign key (`book_id`) references `books` (`id`) on update cascade on delete cascade;',
    );

    // Games
    this.addSql(
      'create table `games` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `description` varchar(255) null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `games_rating` (`id` int unsigned not null auto_increment primary key, `game_id` int not null, `user_id` int not null, `value` int not null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `users_games_in_progress` (`user_id` int unsigned not null, `game_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_games_in_progress` add index `users_games_in_progress_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_games_in_progress` add index `users_games_in_progress_game_id_index`(`game_id`);',
    );
    this.addSql(
      'alter table `users_games_in_progress` add primary key `users_games_in_progress_pkey`(`user_id`, `game_id`);',
    );
    this.addSql(
      'alter table `users_games_in_progress` add constraint `users_games_in_progress_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_games_in_progress` add constraint `users_games_in_progress_game_id_foreign` foreign key (`game_id`) references `games` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_games_completed` (`user_id` int unsigned not null, `game_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_games_completed` add index `users_games_completed_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_games_completed` add index `users_games_completed_game_id_index`(`game_id`);',
    );
    this.addSql(
      'alter table `users_games_completed` add primary key `users_games_completed_pkey`(`user_id`, `game_id`);',
    );
    this.addSql(
      'alter table `users_games_completed` add constraint `users_games_completed_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_games_completed` add constraint `users_games_completed_game_id_foreign` foreign key (`game_id`) references `games` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_games_planned` (`user_id` int unsigned not null, `game_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_games_planned` add index `users_games_planned_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_games_planned` add index `users_games_planned_game_id_index`(`game_id`);',
    );
    this.addSql(
      'alter table `users_games_planned` add primary key `users_games_planned_pkey`(`user_id`, `game_id`);',
    );
    this.addSql(
      'alter table `users_games_planned` add constraint `users_games_planned_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_games_planned` add constraint `users_games_planned_game_id_foreign` foreign key (`game_id`) references `games` (`id`) on update cascade on delete cascade;',
    );

    // Series
    this.addSql(
      'create table `series` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `description` varchar(255) null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `series_rating` (`id` int unsigned not null auto_increment primary key, `series_id` int not null, `user_id` int not null, `value` int not null, `created_at` datetime not null, `updated_at` datetime null) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'create table `users_series_in_progress` (`user_id` int unsigned not null, `series_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_series_in_progress` add index `users_series_in_progress_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_series_in_progress` add index `users_series_in_progress_series_id_index`(`series_id`);',
    );
    this.addSql(
      'alter table `users_series_in_progress` add primary key `users_series_in_progress_pkey`(`user_id`, `series_id`);',
    );
    this.addSql(
      'alter table `users_series_in_progress` add constraint `users_series_in_progress_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_series_in_progress` add constraint `users_series_in_progress_series_id_foreign` foreign key (`series_id`) references `series` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_series_completed` (`user_id` int unsigned not null, `series_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_series_completed` add index `users_series_completed_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_series_completed` add index `users_series_completed_series_id_index`(`series_id`);',
    );
    this.addSql(
      'alter table `users_series_completed` add primary key `users_series_completed_pkey`(`user_id`, `series_id`);',
    );
    this.addSql(
      'alter table `users_series_completed` add constraint `users_series_completed_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_series_completed` add constraint `users_series_completed_series_id_foreign` foreign key (`series_id`) references `series` (`id`) on update cascade on delete cascade;',
    );

    this.addSql(
      'create table `users_series_planned` (`user_id` int unsigned not null, `series_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;',
    );

    this.addSql(
      'alter table `users_series_planned` add index `users_series_planned_user_id_index`(`user_id`);',
    );
    this.addSql(
      'alter table `users_series_planned` add index `users_series_planned_series_id_index`(`series_id`);',
    );
    this.addSql(
      'alter table `users_series_planned` add primary key `users_series_planned_pkey`(`user_id`, `series_id`);',
    );
    this.addSql(
      'alter table `users_series_planned` add constraint `users_series_planned_user_id_foreign` foreign key (`user_id`) references `users` (`id`) on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table `users_series_planned` add constraint `users_series_planned_series_id_foreign` foreign key (`series_id`) references `series` (`id`) on update cascade on delete cascade;',
    );
  }
}
