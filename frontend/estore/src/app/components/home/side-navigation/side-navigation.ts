import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoryService } from './../services/category-service';

@Component({
  selector: 'app-side-navigation',
  imports: [FontAwesomeModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {
  faAngleDown = faAngleDown;
  categories: Category[] = [];

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getAllCategories();
  }

  getCategories(parent_category_id?: number): Category[] {
    return this.categories.filter((category) => category.parent_category_id === parent_category_id);
  }
}
