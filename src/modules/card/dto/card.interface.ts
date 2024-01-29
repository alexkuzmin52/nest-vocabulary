export interface ICard {
  _id: string;
  userId: string;
  front_side: string;
  back_side: string;
  level: number;
  counter: number;
  failed: number;
  topic: string;
}
