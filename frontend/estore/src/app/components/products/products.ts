import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products-service';
import { Product } from '../home/types/products-type';
import { CommonModule } from '@angular/common';
import { Ratings } from '../ratings/ratings';
import { ProductsStore } from './../home/services/product/products-store';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ProductsStore],
})
export class Products {
  constructor(public productsStore: ProductsStore) {}
}
