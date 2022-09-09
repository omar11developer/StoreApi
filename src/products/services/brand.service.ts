import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { BrandCreateDto, UpdateBrandDto } from '../dtos/brands.dtos';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find();
  }
  findOne(id: string) {
    const brand = this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }
  create(data: BrandCreateDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }
  update(id: string, data: UpdateBrandDto) {
    const brand = this.brandModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }
  delete(id: string) {
    const brand = this.brandModel.findByIdAndDelete(id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }
}
