import { Injectable } from '@nestjs/common';

interface StockEntry {
  available: number;
  reserved: number;
  price: number;
}

@Injectable()
export class InventoryService {
  private readonly stock = new Map<string, StockEntry>([
    ['SKU-WIDGET', { available: 100, reserved: 0, price: 19.99 }],
    ['SKU-GADGET', { available: 25, reserved: 0, price: 49.9 }],
    ['SKU-GIZMO', { available: 5, reserved: 0, price: 129.0 }],
  ]);

  getPrice(sku: string): number | undefined {
    return this.stock.get(sku)?.price;
  }

  async isAvailable(sku: string, quantity: number): Promise<boolean> {
    const entry = this.stock.get(sku);
    return !!entry && entry.available - entry.reserved >= quantity;
  }

  async reserve(sku: string, quantity: number): Promise<void> {
    const entry = this.stock.get(sku);
    if (!entry) {
      throw new Error(`Unknown SKU ${sku}`);
    }
    await this.simulateLatency();
    entry.reserved += quantity;
  }

  release(sku: string, quantity: number): void {
    const entry = this.stock.get(sku);
    if (entry) {
      entry.reserved -= quantity;
    }
  }

  commit(sku: string, quantity: number): void {
    const entry = this.stock.get(sku);
    if (entry) {
      entry.available -= quantity;
    }
  }

  private simulateLatency(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 10));
  }
}
