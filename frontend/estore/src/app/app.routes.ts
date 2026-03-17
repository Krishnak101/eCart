import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { ProductsGallery } from './components/home/products-gallery/products-gallery';
import { ProductDetails } from './components/home/product-details/product-details';
import { CartComponent } from './components/home/cart/cart';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((c) => c.Home),
    children: [
      {
        path: 'products',
        component: ProductsGallery,
      },
      {
        path: 'product/:id',
        component: ProductDetails,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: '**', component: NotFound },
];
