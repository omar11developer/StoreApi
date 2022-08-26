import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { BrandCreateDto, UpdateBrandDto } from '../dtos/brands.dtos';
@Injectable()
export class BrandService {
  private counterIdBrand = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Asus',
      image: '',
    },
  ];

  findAll() {
    return this.brands;
  }
  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }
  create(payload: BrandCreateDto) {
    this.counterIdBrand = this.counterIdBrand + 1;
    const newBrand = {
      id: this.counterIdBrand,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brand,
        ...payload,
      };
      return this.brands[index];
    }
    return null;
  }
  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
