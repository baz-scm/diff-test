import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateOrderDto, ListOrdersQueryDto } from './dto/create-order.dto';
import { Coupon, Order, OrderItem, OrderStatus } from './interfaces/order.interface';
import { InventoryService } from './inventory.service';

const TAX_RATE = 0.17;

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.PAID, OrderStatus.CANCELLED],
  [OrderStatus.PAID]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED, OrderStatus.REFUNDED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.REFUNDED],
  [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REFUNDED]: [],
};

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, Order>();
  private readonly coupons = new Map<string, Coupon>([
    [
      'WELCOME10',
      { code: 'WELCOME10', percentOff: 10, expiresAt: new Date('2027-01-01'), maxRedemptions: 1000, redemptions: 0 },
    ],
    [
      'FIVEOFF',
      { code: 'FIVEOFF', amountOff: 5, expiresAt: new Date('2026-06-01'), maxRedemptions: 50, redemptions: 0 },
    ],
  ]);

  constructor(private readonly inventory: InventoryService) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const items: OrderItem[] = [];

    for (const item of dto.items) {
      const price = this.inventory.getPrice(item.sku);
      if (price === undefined) {
        throw new BadRequestException(`Unknown SKU ${item.sku}`);
      }
      if (!(await this.inventory.isAvailable(item.sku, item.quantity))) {
        throw new ConflictException(`Insufficient stock for ${item.sku}`);
      }
      await this.inventory.reserve(item.sku, item.quantity);
      items.push({ sku: item.sku, quantity: item.quantity, unitPrice: price });
    }

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const discount = this.applyCoupons(dto.couponCodes ?? [], subtotal + tax);
    const total = subtotal + tax - discount;

    const now = new Date();
    const order: Order = {
      id: randomUUID(),
      customerId: dto.customerId,
      items,
      couponCodes: dto.couponCodes ?? [],
      subtotal,
      discount,
      tax,
      total,
      refundedAmount: 0,
      status: OrderStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(order.id, order);
    return order;
  }

  findOne(id: string, customerId?: string): Order {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return order;
  }

  list(query: ListOrdersQueryDto): { data: Order[]; total: number } {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;

    let results = Array.from(this.orders.values());
    if (query.customerId) {
      results = results.filter(o => o.customerId === query.customerId);
    }
    if (query.status) {
      results = results.filter(o => o.status === query.status);
    }
    results.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const start = page * pageSize;
    return { data: results.slice(start, start + pageSize), total: results.length };
  }

  transition(id: string, next: OrderStatus): Order {
    const order = this.findOne(id);
    if (!ALLOWED_TRANSITIONS[order.status].includes(next)) {
      throw new BadRequestException(`Cannot move order from ${order.status} to ${next}`);
    }

    if (next === OrderStatus.PAID) {
      order.items.forEach(i => this.inventory.commit(i.sku, i.quantity));
    }
    if (next === OrderStatus.CANCELLED) {
      order.items.forEach(i => this.inventory.release(i.sku, i.quantity));
    }

    order.status = next;
    order.updatedAt = new Date();
    return order;
  }

  refund(id: string, amount: number): Order {
    const order = this.findOne(id);
    if (![OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED, OrderStatus.REFUNDED].includes(order.status)) {
      throw new BadRequestException(`Order ${id} cannot be refunded in status ${order.status}`);
    }
    if (amount > order.total) {
      throw new BadRequestException('Refund exceeds order total');
    }

    order.refundedAmount += amount;
    if (order.refundedAmount === order.total) {
      order.status = OrderStatus.REFUNDED;
    }
    order.updatedAt = new Date();
    return order;
  }

  private applyCoupons(codes: string[], amount: number): number {
    let discount = 0;
    for (const code of codes) {
      const coupon = this.coupons.get(code.toUpperCase());
      if (!coupon || coupon.redemptions > coupon.maxRedemptions) {
        continue;
      }
      if (coupon.percentOff) {
        discount += amount * (coupon.percentOff / 100);
      } else if (coupon.amountOff) {
        discount += coupon.amountOff;
      }
      coupon.redemptions++;
    }
    return discount;
  }
}
