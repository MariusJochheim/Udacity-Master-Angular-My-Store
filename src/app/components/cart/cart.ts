import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CheckoutInfo } from '../../models/product';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  readonly cartItems = this.cartService.cartItems;
  readonly cartTotal = this.cartService.total;
  checkoutInfo: CheckoutInfo = {
    fullName: '',
    address: '',
    creditCard: '',
  };
  cartMessage = '';

  onQuantityChange(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number, productName: string): void {
    this.cartService.removeFromCart(productId);
    this.cartMessage = `${productName} removed from cart.`;
  }

  submitOrder(form: NgForm): void {
    if (form.invalid || this.cartItems().length === 0) {
      return;
    }

    this.orderService.setConfirmation({
      fullName: this.checkoutInfo.fullName,
      total: this.cartTotal(),
    });
    this.cartService.clearCart();
    void this.router.navigate(['/confirmation']);
  }
}
