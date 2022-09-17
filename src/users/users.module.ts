import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';
import { ProductsModule } from '../products/products.module';

//Entidades
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { Order, OrderSchema } from './entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
  ],
  controllers: [CustomersController, UsersController, OrderController],
  providers: [CustomerService, UserService, OrderService],
  exports: [UserService],
})
export class UsersModule {}
