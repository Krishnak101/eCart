import { Component } from '@angular/core';
import { SideNavigation } from '../side-navigation/side-navigation';
import { Products } from '../../products/products';
import { ProductsStore } from '../services/product/products-store';

@Component({
  selector: 'app-products-gallery',
  imports: [SideNavigation, Products],
  templateUrl: './products-gallery.html',
  styleUrl: './products-gallery.css',
})
export class ProductsGallery {
  constructor(private productsStore: ProductsStore) {}

  onSelectSubCategory(subcategoryid: number): void {
    this.productsStore.loadProducts({ subCategoryId: subcategoryid });
  }
}
