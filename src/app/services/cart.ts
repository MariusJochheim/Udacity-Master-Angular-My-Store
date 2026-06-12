import { computed, Injectable, signal } from '@angular/core';

import { CartItem, Product as ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );
  readonly itemCount = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));

  addToCart(product: ProductModel, quantity: number): void {
    const safeQuantity = this.normalizeQuantity(quantity);

    this.items.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );
      }

      return [...items, { product, quantity: safeQuantity }];
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    const safeQuantity = Number(quantity);

    if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.floor(safeQuantity) } : item,
      ),
    );
  }

  removeFromCart(productId: number): void {
    this.items.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this.items.set([]);
  }

  private normalizeQuantity(quantity: number): number {
    const numericQuantity = Number(quantity);

    if (!Number.isFinite(numericQuantity) || numericQuantity < 1) {
      return 1;
    }

    return Math.floor(numericQuantity);
  }
}
