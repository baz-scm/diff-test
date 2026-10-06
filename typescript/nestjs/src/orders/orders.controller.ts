import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateOrderDto, ListOrdersQueryDto, RefundOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './interfaces/order.interface';
import { OrdersService } from './orders.service';

@UseGuards(RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(dto);
  }

  @Get()
  list(@Query() query: ListOrdersQueryDto) {
    return this.ordersService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req): Order {
    return this.ordersService.findOne(id, req.user?.id);
  }

  @Post(':id/pay')
  pay(@Param('id') id: string): Order {
    return this.ordersService.transition(id, OrderStatus.PAID);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string): Order {
    return this.ordersService.transition(id, OrderStatus.CANCELLED);
  }

  @Post(':id/ship')
  @Roles(['admin', 'warehouse'])
  ship(@Param('id') id: string): Order {
    return this.ordersService.transition(id, OrderStatus.SHIPPED);
  }

  @Post(':id/refund')
  @Roles(['admin', 'support'])
  refund(@Param('id') id: string, @Body() dto: RefundOrderDto): Order {
    return this.ordersService.refund(id, dto.amount);
  }
}
