import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStore } from '../services/category/categories-store';
import { SearchKeyword } from '../types/searchKeyword-type';
@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [CategoriesStore],
})
export class Header {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;

  readonly searchclicked = output<SearchKeyword>();
  constructor(public categoriesStore: CategoriesStore) {}

  onSearchClick(keyword: string, categoryId: string): void {
    const searchKeyword: SearchKeyword = {
      categoryId: parseInt(categoryId),
      keyword: keyword,
    };
    this.searchclicked.emit(searchKeyword);
  }
}
