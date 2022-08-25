import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'Soy un user';
  }
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'created',
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
