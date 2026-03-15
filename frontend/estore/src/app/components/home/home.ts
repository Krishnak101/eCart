import { Component } from '@angular/core';
import { Header } from './header/header';
import { CategoryNavigation } from './category.navigation/category.navigation';
import { SideNavigation } from './side-navigation/side-navigation';
import { Products } from '../products/products';
import { CategoryService } from './services/category-service';
import { CategoriesStore } from './services/categories-store';

@Component({
  selector: 'app-home',
  imports: [Header, CategoryNavigation, SideNavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoryService, CategoriesStore],
})
export class Home {
  constructor(private categoriesStore: CategoriesStore) {
    this.categoriesStore.loadCategories();
  }
}
