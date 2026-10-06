export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface OrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  couponCodes: string[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  refundedAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  code: string;
  percentOff?: number;
  amountOff?: number;
  expiresAt: Date;
  maxRedemptions: number;
  redemptions: number;
}
