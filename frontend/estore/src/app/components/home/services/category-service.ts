import { Injectable } from '@angular/core';
import { Category, GetCategoryResponse } from '../types/category';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<GetCategoryResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}
