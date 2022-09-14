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
  create(data: CreateCustomerDtos) {
    console.log(data);
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }
  update(id: string, data: UpdateCustomer) {
    const customer = this.customerModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return customer;
  }
  delete(id: string) {
    const customer = this.customerModel.findByIdAndDelete(id);
    if (!customer) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return customer;
  }
}
