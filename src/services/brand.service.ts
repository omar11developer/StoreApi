import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  private counterId = 1;
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
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: number, payload: any) {
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
