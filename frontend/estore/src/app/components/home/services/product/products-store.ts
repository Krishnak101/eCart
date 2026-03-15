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

  loadProducts(filters?: { mainCategoryId?: number; subCategoryId?: number }): void {
    this.ProductsService.getProductsList(filters).subscribe((newProducts) => {
      this._products.set(newProducts);
    });
  }
}
