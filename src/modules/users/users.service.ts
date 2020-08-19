import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { PhotoEntity } from '../photo/photo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({ relations: ['photos'] });
  }

  async create(user): Promise<UsersEntity[]> {
    const { name, url } = user;
    const u = await getRepository(UsersEntity).findOne({ where: { name } });
    if (u) {
      throw new HttpException({
        message: 'Input data validation failed',
        error: 'name must be unique.',
      }, HttpStatus.BAD_REQUEST);
    }
    const photo = new PhotoEntity();
    photo.url = url;
    await this.connection.manager.save(photo);
    user.photos = [photo];
    return await this.usersRepository.save(user);
  }

  async createMany(users: UsersEntity[]) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      users.forEach(async user => {
        await this.create(user);
        // await queryRunner.manager.getRepository(UsersEntity).save(user);
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}
