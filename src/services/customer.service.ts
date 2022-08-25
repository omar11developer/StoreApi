import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDtos, UpdateCustomer } from '../dtos/customer.dtos';
import { Customer } from '../entities/customer.entity';
@Injectable()
export class CustomerService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Omar',
      lastName: 'Menjivar',
      phone: '2143-2343',
    },
  ];
  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
  create(data: CreateCustomerDtos) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...data,
    };
    this.customers.push(newCustomer);
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
  }
}
