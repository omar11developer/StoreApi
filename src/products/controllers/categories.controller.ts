import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryServices: CategoryService) {}

  @Get()
  getCategory() {
    return this.categoryServices.findAll();
  }
  @Get(':id')
  getOneCategory(@Param('id', MongoIdPipe) id: string) {
    return this.categoryServices.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return {
      message: 'updated',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.categoryServices.delete(id);
  }
}
