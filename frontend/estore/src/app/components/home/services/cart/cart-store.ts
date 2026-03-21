import { computed, effect, signal } from '@angular/core';
import { CartItem } from '../../types/cart-type';
import { Product } from '../../types/products-type';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class CartStore {
  private platformId = inject(PLATFORM_ID);
  private readonly _products = signal<CartItem[]>([]);

  // private _saveEffect = effect(() => {
  //   const productsInCart = this._products();
  //   if (productsInCart.length === 0) {
  //     sessionStorage.removeItem('cart');
  //   } else {
  //     sessionStorage.setItem('cart', JSON.stringify(productsInCart));
  //   }
  // });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this._products.set(this.loadFromSession());
    }

    // 3. Ensure the effect only runs storage logic in the browser
    effect(() => {
      const productsInCart = this._products();
      if (isPlatformBrowser(this.platformId)) {
        if (productsInCart.length === 0) {
          sessionStorage.removeItem('cart');
        } else {
          sessionStorage.setItem('cart', JSON.stringify(productsInCart));
        }
      }
    });
  }

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

  increaseProductQuantity(product: Product): void {
    const currentCartItems = this._products();
    const existingCartItemIndex = currentCartItems.findIndex(
      (existingProduct) => existingProduct.item.id === product.id,
    );

    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...currentCartItems];
      const existingCartItem = updatedCartItems[existingCartItemIndex];
      existingCartItem.count += 1;
      existingCartItem.amount = existingCartItem.amount + existingCartItem.item.price;
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

  decreaseProductQuantity(cartItem: CartItem): void {
    const updatedCartItems = this._products()
      .map((item) => {
        if (item.item.id === cartItem.item.id) {
          if (item.count <= 1) {
            return null; // Mark for removal
          }
          return { ...item, count: item.count - 1, amount: item.amount - item.item.price };
        }
        return item;
      })
      .filter(Boolean) as CartItem[]; // Remove null items
    this._products.set(updatedCartItems);
  }

  removeProduct(cartItem: CartItem): void {
    const updatedCartItems = this._products().filter((item) => item.item.id !== cartItem.item.id);
    this._products.set(updatedCartItems);
  }

  private loadFromSession(): CartItem[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    const storedProductsInCart = sessionStorage.getItem('cart');
    try {
      return storedProductsInCart ? JSON.parse(storedProductsInCart) : [];
    } catch (error) {
      console.error('Error parsing cart from session storage:', error);
      return [];
    }
  }
}
