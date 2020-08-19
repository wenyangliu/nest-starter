import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() body) {
    const newBody = { ...body, status: true };
    return await this.usersService.create(newBody);
  }

  @Post('/many')
  async createMany(@Body() body) {
    const { users } = body;
    const newUsers = users.map(user => ({ ...user, status: true }));
    return await this.usersService.createMany(newUsers);
  }
}

