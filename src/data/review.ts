export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  verified: boolean;
  date: string;
  comment: string;
}