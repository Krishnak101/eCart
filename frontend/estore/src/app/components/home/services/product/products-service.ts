import { Injectable } from '@angular/core';
import { GetProductResponse, Product } from '../../types/products-type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  private baseUrl = 'http://localhost:8080/api/products';
  constructor(private httpClient: HttpClient) {}
  private additionalPath = '';
  getProductsList(filters?: {
    mainCategoryId?: number;
    subCategoryId?: number;
    keyword?: string;
  }): Observable<Product[]> {
    let params = new HttpParams();
    if (filters?.mainCategoryId != null) {
      if (filters.keyword) {
        this.additionalPath = '/search/findByParentCategoryAndKeywords';
        params = params
          .set('parentId', filters.mainCategoryId.toString())
          .set('keyword', filters.keyword);
      } else {
        this.additionalPath = '/search/findByCategoryParentCategoryId';
        params = params.set('parentId', filters.mainCategoryId.toString());
      }
    } else if (filters?.subCategoryId != null) {
      this.additionalPath = '/search/findByCategoryId';
      params = params.set('id', filters.subCategoryId.toString());
    }

    return this.httpClient
      .get<GetProductResponse>(this.baseUrl + this.additionalPath, { params })
      .pipe(map((response) => response._embedded.products));
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${productId}`);
  }
}
