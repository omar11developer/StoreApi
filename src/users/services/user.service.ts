import { ProductService } from './../../products/services/product.service';
import { ConfigService } from '@nestjs/config';
import { Order } from './../entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDtos, UpdateUserDtos } from '../dtos/users.dtos';

@Injectable()
export class UserService {
  constructor(
    private productServices: ProductService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'omarmenjivar@gmail.com',
      password: 'admin123',
      role: 'admin',
    },
  ];
  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(`Our api key is: ${apiKey} and our data base is: ${dbName} `);
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  create(data: CreateUserDtos) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, data: UpdateUserDtos) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...data,
      };
      return this.users[index];
    }
    return null;
  }
  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productServices.findAll(),
    };
  }
}
