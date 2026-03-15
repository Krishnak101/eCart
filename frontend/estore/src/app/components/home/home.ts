import { Component } from '@angular/core';
import { Header } from './header/header';
import { CategoryNavigation } from './category.navigation/category.navigation';
import { SideNavigation } from './side-navigation/side-navigation';
import { Products } from '../products/products';
import { CategoriesStore } from './services/category/categories-store';
import { ProductsStore } from './services/product/products-store';

@Component({
  selector: 'app-home',
  imports: [Header, CategoryNavigation, SideNavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoriesStore, ProductsStore],
})
export class Home {
  constructor(
    private categoriesStore: CategoriesStore,
    private productsStore: ProductsStore,
  ) {
    this.categoriesStore.loadCategories();
    this.productsStore.loadProducts();
  }
}
