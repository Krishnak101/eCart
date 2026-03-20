import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ratings } from '../ratings/ratings';
import { ProductsStore } from './../home/services/product/products-store';
import { faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { CartStore } from '../home/services/cart/cart-store';
import { Product } from '../home/types/products-type';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings, FontAwesomeModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  constructor(
    public productsStore: ProductsStore,
    private cart: CartStore,
  ) {}

  addToCart(product: Product): void {
    this.cart.increaseProductQuantity(product);
  }
}
