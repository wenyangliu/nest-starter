import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {
  }

  @Get()
  findAll(@Query() query) {
    console.log('query', query);
    return this.movieService.findAll(query);
  }
}
