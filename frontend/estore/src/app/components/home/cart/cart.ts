import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../services/cart/cart-store';
import { CartItem } from '../types/cart-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Ratings } from "../../ratings/ratings";

@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, CommonModule, Ratings],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  faBoxOpen = faBoxOpen;
  constructor(
    public cartStore: CartStore,
    private router: Router,
  ) {}

  navigateToHome(): void {
    this.router.navigate(['/home/products']);
  }
}
