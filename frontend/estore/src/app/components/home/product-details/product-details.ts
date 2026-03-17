import { Component, inject, signal } from '@angular/core';
import { Ratings } from '../../ratings/ratings';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/product/products-service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Product } from '../types/products-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [Ratings, CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);

  private readonly productsService = inject(ProductsService);

  readonly product = signal<Product | null>(null);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const productId = idParam ? parseInt(idParam) : null;
    if (productId !== null && !isNaN(productId)) {
      this.productsService
        .getProductById(productId)
        .pipe(takeUntilDestroyed())
        .subscribe((res) => {
          this.product.set(Array.isArray(res) ? res[0] : res);
        });
    }
  }
}
