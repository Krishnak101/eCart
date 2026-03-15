import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoryService } from '../services/category/category-service';
import { CategoriesStore } from '../services/category/categories-store';

@Component({
  selector: 'app-side-navigation',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
  providers: [CategoryService],
})
export class SideNavigation {
  faAngleDown = faAngleDown;

  private categoryStore = inject(CategoriesStore);

  readonly categories = this.categoryStore.categories;

  getCategories(parent_category_id?: number): Category[] {
    return this.categories().filter((category) => category.parentCategoryId == parent_category_id);
  }
}
