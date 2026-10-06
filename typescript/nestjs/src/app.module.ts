import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CoreModule, CatsModule, OrdersModule],
})
export class AppModule {}
