import { Product } from './products-type';

export interface CartItem {
  item: Product;
  count: number;
  amount: number;
}

export interface Cart {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
}
