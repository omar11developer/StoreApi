import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
@Injectable()
export class CategoryService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Electronic',
    },
  ];
  findAll() {
    return this.categories;
  }
}
