/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SubDoc {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const SubSchema = SchemaFactory.createForClass(SubDoc);
