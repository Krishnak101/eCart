export interface Product {
  id: number;
  productName: string;
  productDescription: string;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  price: number;
  ratings: number;
}

// Matches your Spring Boot HAL structure
export interface GetProductResponse {
  _embedded: {
    products: Product[];
  };
}
