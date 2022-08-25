import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getCategoria() {
    return {
      message: 'succes',
    };
  }
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'succes',
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
