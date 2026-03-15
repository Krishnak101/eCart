import { Component } from '@angular/core';
import { ProductsService } from './products-service';
import { Product } from './products-type';
import { CommonModule } from '@angular/common';
import { Ratings } from '../ratings/ratings';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ProductsService],
})
export class Products {
  products: Product[] = [];

  constructor(productsService: ProductsService) {
    productsService.getProductsList().subscribe((products) => {
      this.products = products;
    });
  }
}
