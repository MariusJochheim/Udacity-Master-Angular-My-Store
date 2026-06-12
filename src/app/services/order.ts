import { Injectable, signal } from '@angular/core';

import { OrderConfirmation } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly confirmation = signal<OrderConfirmation | null>(null);

  readonly orderConfirmation = this.confirmation.asReadonly();

  setConfirmation(orderConfirmation: OrderConfirmation): void {
    this.confirmation.set(orderConfirmation);
  }

  clearConfirmation(): void {
    this.confirmation.set(null);
  }
}
