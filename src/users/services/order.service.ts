import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dtos';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const productId = await this.orderModel.findById(id);
    if (productId == null) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return productId;
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productsIds: string[]) {
    const order = await this.orderModel.findByIdAndUpdate(id, {
      $addToSet: { productos: productsIds },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order.save();
  }
}
