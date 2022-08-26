/* eslint-disable prettier/prettier */
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDtos {
  @IsEmail()
  @IsNotEmpty()
  email:string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateUserDtos extends PartialType(CreateUserDtos) {}
