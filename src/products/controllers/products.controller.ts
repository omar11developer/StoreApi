import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from './../../common/mongo-id.pipe';

import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FillterProductsDto,
} from '../dtos/products.dtos';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(@Query() params: FillterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id);
  }
}
