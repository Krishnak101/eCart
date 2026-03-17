import { Component, output, signal } from '@angular/core';
import { CategoryService } from '../services/category/category-service';
import { Category } from '../types/category';
import { CategoriesStore } from '../services/category/categories-store';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-category-navigation',
  imports: [RouterLink],
  templateUrl: './category.navigation.html',
  styleUrl: './category.navigation.css',
  providers: [CategoriesStore, CategoryService],
})
export class CategoryNavigation {
  readonly categoryclicked = output<number>();
  displayOptions = signal(true);
  constructor(
    public categoriesStore: CategoriesStore,
    private router: Router,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.displayOptions.set(router.url === '/home/products');
    });
  }

  onCategoryClick(mainCategoryId: number): void {
    this.categoryclicked.emit(mainCategoryId);
  }
}
