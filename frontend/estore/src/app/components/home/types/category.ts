export interface Category {
  id: number;
  categoryName: string;
  parentCategoryId?: number;
}

export interface GetCategoryResponse {
  _embedded: {
    productCategory: Category[];
  };
}
