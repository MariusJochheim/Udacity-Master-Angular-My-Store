import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Product as ProductModel } from '../models/product';
import { ProductService } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpTesting: HttpTestingController;

  const products: ProductModel[] = [
    {
      id: 1,
      name: 'Book',
      price: 9.99,
      url: 'book.jpg',
      description: 'Readable',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch products from the assets JSON file', () => {
    service.getProducts().subscribe((result) => {
      expect(result).toEqual(products);
    });

    const request = httpTesting.expectOne('assets/data.json');
    expect(request.request.method).toBe('GET');
    request.flush(products);
  });

  it('should find a product by id', () => {
    service.getProduct(1).subscribe((result) => {
      expect(result).toEqual(products[0]);
    });

    httpTesting.expectOne('assets/data.json').flush(products);
  });
});
