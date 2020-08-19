import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {
}
