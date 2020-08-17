import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Delete,
  Body,
  Param,
  Headers,
  UseFilters,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExceptionService } from './exception.service';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

@ApiBearerAuth()
@ApiTags('exception')
@UseFilters(new HttpExceptionFilter())
@Controller('exception')
export class ExceptionController {
  constructor(private readonly exceptionService: ExceptionService) {
  }

  // 查询
  @Get()
  fetch(@Query() { id }, @Headers('token') token): string {
    console.log(token);
    if (!id) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST, message: '请求参数id 必传', error: 'id is required',
      }, HttpStatus.BAD_REQUEST);
    }
    return this.exceptionService.fetch(id);
  }

  @Post()
  @ApiBody({ description: '请输入message' })
  save(@Body() { message }): string {
    return this.exceptionService.save(message);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入更新内容' })
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
    console.log(typeof id);
    return this.exceptionService.update(id, message);
  }

  @Delete()
  @ApiQuery({ name: 'id' })
  remove(@Query() { id }): string {
    return this.exceptionService.remove(id);
  }


}
