import { Injectable } from '@angular/core';
import { GetProductResponse, Product } from './products-type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.httpClient
      .get<GetProductResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}
