import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDtos, UpdateCustomer } from '../dtos/customer.dtos';
import { Customer } from '../entities/customer.entity';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  findAll() {
    return this.customerModel.find();
  }
  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
  /* create(data: CreateCustomerDtos) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  update(id: number, data: UpdateCustomer) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers[index] = {
        ...customer,
        ...data,
      };
      return this.customers[index];
    }
    return null;
  }
  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  } */
}
