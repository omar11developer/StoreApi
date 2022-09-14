import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from '../dtos/order.dtos';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }

  @Put(':id/products')
  updateProducts(
    @Param('id') id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return this.ordersService.addProducts(id, payload.productsIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
