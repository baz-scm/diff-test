import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, InventoryService],
})
export class OrdersModule {}
