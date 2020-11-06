import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service';
import { MoviesSchema } from './movies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Movie', schema: MoviesSchema}
    ])
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
