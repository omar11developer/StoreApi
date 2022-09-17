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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from './../../common/mongo-id.pipe';

import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FillterProductsDto,
} from '../dtos/products.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts(@Query() params: FillterProductsDto) {
    return this.productsService.findAll(params);
  }
  @Public()
  @Get(':productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }
  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id);
  }
}
