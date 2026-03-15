import { Injectable, signal } from '@angular/core';
import { Product } from '../../types/products-type';
import { ProductsService } from './products-service';

@Injectable()
export class ProductsStore {
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  constructor(private ProductsService: ProductsService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductsService.getProductsList().subscribe((products) => {
      this._products.set(products);
    });
  }
}
