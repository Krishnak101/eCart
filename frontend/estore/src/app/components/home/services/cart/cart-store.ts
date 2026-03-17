import { computed, signal } from '@angular/core';
import { CartItem } from '../../types/cart-type';
import { Product } from '../../types/products-type';

export class CartStore {
  private readonly _products = signal<CartItem[]>([]);

  private totalAmount = computed(() => {
    return this._products().reduce((total, item) => total + item.amount, 0);
  });

  readonly totalProductsCount = computed(() => {
    return this._products().reduce((count, item) => count + item.count, 0);
  });

  readonly cart = computed(() => {
    return {
      items: this._products(),
      totalCount: this.totalProductsCount(),
      totalAmount: this.totalAmount(),
    };
  });

  addProductToCart(product: Product): void {
    const currentCartItems = this._products();
    const existingCartItemIndex = currentCartItems.findIndex(
      (existingProduct) => existingProduct.item.id === product.id,
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...currentCartItems];
      const existingCartItem = updatedCartItems[existingCartItemIndex];
      existingCartItem.count += 1;
      existingCartItem.amount = existingCartItem.count * existingCartItem.item.price;
      this._products.set(updatedCartItems);
    } else {
      const newCartItem: CartItem = {
        item: product,
        count: 1,
        amount: product.price,
      };
      this._products.set([...currentCartItems, newCartItem]);
    }
  }
}
