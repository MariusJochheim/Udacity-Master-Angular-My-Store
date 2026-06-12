export interface Product {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutInfo {
  fullName: string;
  address: string;
  creditCard: string;
}

export interface OrderConfirmation {
  fullName: string;
  total: number;
}
