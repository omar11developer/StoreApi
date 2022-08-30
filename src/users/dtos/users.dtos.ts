/* eslint-disable prettier/prettier */
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUserDtos {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email:string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateUserDtos extends PartialType(CreateUserDtos) {}
