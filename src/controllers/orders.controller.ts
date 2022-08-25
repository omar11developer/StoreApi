import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders() {
    return 'Soy una Order';
  }
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'created',
      payload,
    };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'updated',
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'deleted',
      id,
    };
  }
}
