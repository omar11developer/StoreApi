import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCustomerDtos, UpdateCustomer } from '../dtos/customer.dtos';
import { CustomerService } from '../services/customer.service';
@Controller('customers')
export class CustomersController {
  constructor(private customerServices: CustomerService) {}
  @Get()
  getCustomers() {
    return this.customerServices.findAll();
  }
  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerServices.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateCustomerDtos) {
    return this.customerServices.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomer,
  ) {
    return this.customerServices.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerServices.delete(id);
  }
}
