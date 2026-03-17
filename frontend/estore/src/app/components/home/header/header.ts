import { Component, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUserCircle, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStore } from '../services/category/categories-store';
import { CartStore } from '../services/cart/cart-store';
import { SearchKeyword } from '../types/searchKeyword-type';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
  displaySearch = signal(true);

  constructor(
    public categoriesStore: CategoriesStore,
    private router: Router,
    public cartStore: CartStore,
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.displaySearch.set(this.router.url === '/home/products');
    });
  }

  onSearchClick(keyword: string, categoryId: string): void {
    const searchKeyword: SearchKeyword = {
      categoryId: parseInt(categoryId),
      keyword: keyword,
    };
    this.searchclicked.emit(searchKeyword);
  }

  navigateToCart(): void {
    this.router.navigate(['/home/cart']);
  }
}
