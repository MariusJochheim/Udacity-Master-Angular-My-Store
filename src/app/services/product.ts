import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product as ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsUrl = 'assets/data.json';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }

  getProduct(productId: number): Observable<ProductModel | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === productId)),
    );
  }
}
