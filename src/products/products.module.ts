import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { BrandService } from './services/brand.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [BrandService, CategoryService, ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
