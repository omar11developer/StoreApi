import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateUserDtos,
  UpdateUserDtos,
  FillterUsers,
} from '../dtos/users.dtos';
import { UserService } from '../services/user.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersServices: UserService) {}
  @Get()
  @ApiOperation({ summary: 'List of users' })
  getUsers(@Query() params: FillterUsers) {
    return this.usersServices.findAll(params);
  }
  @ApiOperation({ summary: 'List a user' })
  @Get(':id')
  getUser(@Param('id', MongoIdPipe) id: string) {
    return this.usersServices.findOne(id);
  }
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() payload: CreateUserDtos) {
    return this.usersServices.create(payload);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Edit a user' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDtos,
  ) {
    return this.usersServices.update(id, payload);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.usersServices.delete(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'List a user with your orders' })
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.usersServices.getOrdersByUser(id);
  }
}
