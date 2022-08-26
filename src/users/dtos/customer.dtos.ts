/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
export class CreateCustomerDtos {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateCustomer extends PartialType(CreateCustomerDtos) {}
