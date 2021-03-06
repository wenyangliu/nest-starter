import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启跨域
  app.enableCors();

  // 全局使用中间件
  // app.use(logger)

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe());

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('nest starter project api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3001);
}

bootstrap();
