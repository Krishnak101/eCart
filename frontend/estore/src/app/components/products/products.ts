import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ratings } from '../ratings/ratings';
import { ProductsStore } from './../home/services/product/products-store';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings, FontAwesomeModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;
  constructor(public productsStore: ProductsStore) {}
}
