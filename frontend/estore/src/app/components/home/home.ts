import { Component } from '@angular/core';
import { Header } from './header/header';
import { CategoryNavigation } from './category.navigation/category.navigation';
import { SideNavigation } from './side-navigation/side-navigation';
import { Products } from '../products/products';
import { CategoriesStore } from './services/category/categories-store';
import { ProductsStore } from './services/product/products-store';
import { CategoryService } from './services/category/category-service';
import { ProductsService } from './services/product/products-service';
import { SearchKeyword } from './types/searchKeyword-type';

@Component({
  selector: 'app-home',
  imports: [Header, CategoryNavigation, SideNavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoriesStore, ProductsStore, CategoryService, ProductsService],
})
export class Home {
  constructor(
    private categoriesStore: CategoriesStore,
    private productsStore: ProductsStore,
  ) {
    this.categoriesStore.loadCategories();
    this.productsStore.loadProducts();
  }

  onSelectSubCategory(subcategoryid: number): void {
    this.productsStore.loadProducts({ subCategoryId: subcategoryid });
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
