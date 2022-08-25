import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategory() {
    return { message: 'get all categories' };
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
