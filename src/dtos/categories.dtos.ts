/* eslint-disable prettier/prettier */
import {IsNumber, IsString, IsNotEmpty} from 'class-validator'
import {PartialType} from '@nestjs/mapped-types';
export class CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
