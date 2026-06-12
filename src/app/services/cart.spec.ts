import { TestBed } from '@angular/core/testing';

import { Product as ProductModel } from '../models/product';
import { CartService } from './cart';

describe('CartService', () => {
  let service: CartService;
  const product: ProductModel = {
    id: 1,
    name: 'Book',
    price: 9.99,
    url: 'book.jpg',
    description: 'Readable',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clearCart();
  });

  it('should add products and update totals', () => {
    service.addToCart(product, 2);

    expect(service.cartItems()).toEqual([{ product, quantity: 2 }]);
    expect(service.total()).toBeCloseTo(19.98);
  });

  it('should merge duplicate products', () => {
    service.addToCart(product, 1);
    service.addToCart(product, 3);

    expect(service.cartItems()[0]?.quantity).toBe(4);
  });

  it('should remove products when quantity is zero', () => {
    service.addToCart(product, 1);
    service.updateQuantity(product.id, 0);

    expect(service.cartItems()).toEqual([]);
  });
});
