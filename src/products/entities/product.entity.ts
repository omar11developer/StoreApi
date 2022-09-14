/* eslint-disable prettier/prettier */
import { SubDoc, SubSchema } from './subDoc.entity';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: Number, index: true })
  price: number;
  @Prop({ type: Number })
  stock: number;
  @Prop()
  image: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name})
  brand: Brand | Types.ObjectId;

  @Prop({type: SubSchema})
  subDoc: SubDoc;

  @Prop({type: [SubSchema]})
  subDocs: Types.Array<SubDoc>
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, strok: -1 });
