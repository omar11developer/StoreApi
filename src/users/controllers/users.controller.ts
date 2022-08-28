import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDtos, UpdateUserDtos } from '../dtos/users.dtos';
import { UserService } from '../services/user.service';
@Controller('users')
export class UsersController {
  constructor(private usersServices: UserService) {}
  @Get()
  getUsers() {
    return this.usersServices.findAll();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateUserDtos) {
    return this.usersServices.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDtos,
  ) {
    return this.usersServices.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.delete(id);
  }
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.getOrdersByUser(id);
  }
}
