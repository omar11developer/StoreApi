import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return 'Soy un customers';
  }
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Created',
      payload,
    };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'Updated',
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
