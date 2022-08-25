/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsUrl, IsNotEmpty} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';
export class BrandCreateDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(BrandCreateDto) {};
