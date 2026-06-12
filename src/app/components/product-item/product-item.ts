import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Product as ProductModel } from '../../models/product';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input({ required: true }) product!: ProductModel;
  @Output() addProduct = new EventEmitter<{ product: ProductModel; quantity: number }>();

  readonly quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity = 1;

  onQuantityChange(quantity: number): void {
    this.quantity = Number(quantity);
  }

  addToCart(): void {
    this.addProduct.emit({ product: this.product, quantity: this.quantity });
  }
}
