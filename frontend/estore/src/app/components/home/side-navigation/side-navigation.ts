import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { CategoryService } from './../services/category-service';

@Component({
  selector: 'app-side-navigation',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
  providers: [CategoryService],
})
export class SideNavigation {
  faAngleDown = faAngleDown;
  categories: Category[] = [];

  constructor(categoryService: CategoryService) {
    categoryService.getAllCategories().subscribe((productCategory) => {
      this.categories = productCategory;
    });
  }

  getCategories(parent_category_id?: number): Category[] {
    return this.categories.filter((category) => category.parentCategoryId == parent_category_id);
  }
}
