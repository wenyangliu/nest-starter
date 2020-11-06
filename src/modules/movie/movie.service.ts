import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie')
    private readonly movieModel
  ) {
  }

  // private static movies = [];

  async findAll(query: any): Promise<any> {
    const skip = Number(query.skip) || 0;
    const limit = Number(query.limit) || 50;
    delete query.skip;
    delete query.limit;
    if (query.q) {
      query.name = new RegExp(query.q, 'i')
      delete query.q
    }
    console.log(query);
    const total = await this.movieModel.countDocuments(query);
    const data = await this.movieModel.find(query).skip(skip).limit(limit);
    return { total, limit, skip, data };
  }
}
