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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDtos, UpdateUserDtos } from '../dtos/users.dtos';
import { UserService } from '../services/user.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersServices: UserService) {}
  @Get()
  @ApiOperation({ summary: 'List of users' })
  getUsers() {
    return this.usersServices.findAll();
  }
  @ApiOperation({ summary: 'List a user' })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersServices.findOne(id);
  }
  /* @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() payload: CreateUserDtos) {
    return this.usersServices.create(payload);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Edit a user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDtos,
  ) {
    return this.usersServices.update(id, payload);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.delete(id);
  } */
  @Get(':id/orders')
  @ApiOperation({ summary: 'List a user with your orders' })
  getOrders(@Param('id', ParseIntPipe) id: string) {
    return this.usersServices.getOrdersByUser(id);
  }
}
