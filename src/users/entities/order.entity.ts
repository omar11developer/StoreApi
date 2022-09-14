import { Customer } from './customer.entity';

/* eslint-disable prettier/prettier */
import { Product } from './../../products/entities/product.entity';


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Order extends Document {
  @Prop({type: Date})
  date: Date;

  @Prop({type: Types.ObjectId, ref: Customer.name, required:true})
  customer: Customer | Types.ObjectId;


  @Prop({type: [{type: Types.ObjectId, ref: Product.name} ]})
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
