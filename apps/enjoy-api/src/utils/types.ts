export type UserBooksType =
  | 'booksInProgress'
  | 'booksCompleted'
  | 'booksPlanned';

export type UserGamesType =
  | 'gamesInProgress'
  | 'gamesCompleted'
  | 'gamesPlanned';

export type UserSeriesType =
  | 'seriesInProgress'
  | 'seriesCompleted'
  | 'seriesPlanned';

export type UserActivityType = UserBooksType & UserGamesType & UserSeriesType;
