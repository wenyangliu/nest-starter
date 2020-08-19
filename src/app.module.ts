import { resolve } from 'path';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MailerModule } from '@nestjs-modules/mailer';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/statusMonitor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { HelloModule } from './modules/hello/hello.module';
import { ExceptionModule } from './modules/exception/exception.module';
import { RoleGuardModule } from './modules/role-guard/role-guard.module';
import { EmailModule } from './modules/email/email.module';
import { UsersModule } from './modules/users/users.module';
// import { TasksModule } from './tasks/tasks.module';
import { AudioModule } from './jobs/audio/audio.module';
import { AlbumModule } from './modules/album/album.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),
    HelloModule,
    HelloModule,
    ExceptionModule,
    RoleGuardModule,
    EmailModule,
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
    // TasksModule,
    AudioModule,
    AlbumModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
