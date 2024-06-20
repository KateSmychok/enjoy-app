export interface Item {
  id: number;
  author?: string;
  title: string;
  rating?: number;
  description?: string;
  inProgress?: number;
  completed?: number;
  planned?: number;
}
