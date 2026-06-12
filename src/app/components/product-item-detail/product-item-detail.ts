import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product as ProductModel } from '../../models/product';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-item-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-item-detail.html',
  styleUrl: './product-item-detail.css',
})
export class ProductItemDetail implements OnInit {
  readonly quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly product = signal<ProductModel | undefined>(undefined);
  quantity = 1;
  cartMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(productId).subscribe((product) => {
      this.product.set(product);
    });
  }

  onQuantityChange(quantity: number): void {
    this.quantity = Number(quantity);
  }

  addToCart(): void {
    const product = this.product();

    if (!product) {
      return;
    }

    this.cartService.addToCart(product, this.quantity);
    this.cartMessage = `${this.quantity} ${product.name} added to cart.`;
  }
}
