/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateCustomerDtos {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any;

}

export class UpdateCustomer extends PartialType(CreateCustomerDtos) {}
