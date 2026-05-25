import { Component } from '@angular/core';
import { Header } from './header/header';
import { CategoryNavigation } from './category.navigation/category.navigation';
import { CategoriesStore } from './services/category/categories-store';
import { ProductsStore } from './services/product/products-store';
import { CategoryService } from './services/category/category-service';
import { ProductsService } from './services/product/products-service';
import { SearchKeyword } from './types/searchKeyword-type';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { CartStore } from './services/cart/cart-store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Header, CategoryNavigation, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoriesStore, ProductsStore, CategoryService, ProductsService, CartStore],
})
export class Home {
  constructor(
    private categoriesStore: CategoriesStore,
    private productsStore: ProductsStore,
    private router: Router,
  ) {
    this.categoriesStore.loadCategories();
    this.productsStore.loadProducts();
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      if ((event as NavigationEnd).url === '/home') {
        router.navigate(['/home/products']);
      }
    });
  }

  onSelectMainCategory(mainCategoryId: number): void {
    this.productsStore.loadProducts({ mainCategoryId: mainCategoryId });
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStore.loadProducts({
      mainCategoryId: searchKeyword.categoryId,
      keyword: searchKeyword.keyword,
    });
  }
}
