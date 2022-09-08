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
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from '../services/brand.service';
import { BrandCreateDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandServices: BrandService) {}
  @Get()
  getCategorias() {
    return this.brandServices.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.brandServices.findOne(id);
  }
  @Post()
  create(@Body() payload: BrandCreateDto) {
    return this.brandServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandServices.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandServices.delete(id);
  }
}
