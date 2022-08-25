import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDtos, UpdateUserDtos } from '../dtos/users.dtos';
@Injectable()
export class UserService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'omarmenjivar@gmail.com',
      password: 'admin123',
      role: 'admin',
    },
  ];
  findAll() {
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  create(data: CreateUserDtos) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, data: UpdateUserDtos) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...data,
      };
      return user;
    }
    return null;
  }
  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
