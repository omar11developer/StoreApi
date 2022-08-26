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
import { BrandService } from '../services/brand.service';
import { BrandCreateDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Controller('brands')
export class BrandsController {
  constructor(private brandServices: BrandService) {}
  @Get()
  getCategorias() {
    return this.brandServices.findAll();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandServices.findOne(id);
  }
  @Post()
  create(@Body() payload: BrandCreateDto) {
    return this.brandServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandServices.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandServices.delete(id);
  }
}
