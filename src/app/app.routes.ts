import { Routes } from '@angular/router';

import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';
import { ProductItemDetail } from './components/product-item-detail/product-item-detail';
import { ProductList } from './components/product-list/product-list';

export const routes: Routes = [
  { path: '', component: ProductList, pathMatch: 'full' },
  { path: 'products/:id', component: ProductItemDetail },
  { path: 'cart', component: Cart },
  { path: 'confirmation', component: Confirmation },
  { path: '**', redirectTo: '' },
];
