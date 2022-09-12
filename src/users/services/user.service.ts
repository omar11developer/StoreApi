import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ProductService } from './../../products/services/product.service';
import { ConfigService } from '@nestjs/config';
import { Order } from './../entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import {
  CreateUserDtos,
  UpdateUserDtos,
  FillterUsers,
} from '../dtos/users.dtos';

@Injectable()
export class UserService {
  constructor(
    private productServices: ProductService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll(params?: FillterUsers) {
    if (params) {
      const filters: FilterQuery<User> = {};
      const { rol } = params;
      if (rol) {
        filters.role = rol;
      }
      return this.userModel.find(filters).exec();
    }
    /* const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(`Our api key is: ${apiKey} and our data base is: ${dbName} `); */
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  create(data: CreateUserDtos) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }
  update(id: string, data: UpdateUserDtos) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getOrdersByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productServices.findAll(),
    };
  }
}
