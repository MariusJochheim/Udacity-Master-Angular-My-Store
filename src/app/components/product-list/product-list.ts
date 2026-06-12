import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

import { Product as ProductModel } from '../../models/product';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  readonly products = signal<ProductModel[]>([]);
  cartMessage = '';

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }

  addToCart(event: { product: ProductModel; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    this.cartMessage = `${event.quantity} ${event.product.name} added to cart.`;
  }
}
