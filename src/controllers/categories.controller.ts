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
import { CategoryService } from '../services/category.service';
import {CreateCategoryDto, UpdateCategoryDto} from '../dtos/categories.dtos';
@Controller('categories')
export class CategoriesController {
  constructor(private categoryServices: CategoryService) {}

  @Get()
  getCategory() {
    return this.categoryServices.findAll();
  }
  @Get(':id')
  getOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryServices.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryServices.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return {
      message: 'updated',
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryServices.delete(id);
  }
}
