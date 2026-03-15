import { Component } from '@angular/core';
import { CategoryService } from '../services/category/category-service';
import { Category } from '../types/category';
import { CategoriesStore } from '../services/category/categories-store';

@Component({
  selector: 'app-category-navigation',
  imports: [],
  templateUrl: './category.navigation.html',
  styleUrl: './category.navigation.css',
  providers: [CategoriesStore, CategoryService],
})
export class CategoryNavigation {
  constructor(public categoriesStore: CategoriesStore) {}
}
