import { CreateSubDocDto } from './subDoc.dtos';

/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './categories.dtos'
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FillterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
