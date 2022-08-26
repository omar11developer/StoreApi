import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [CustomersController, UsersController],
  providers: [CustomerService, UserService],
})
export class UsersModule {}
