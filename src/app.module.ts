import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { MenuModule } from './modules/menu/menu.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as express from 'express';
@Module({
  imports: [ProductModule, CategoryModule, MenuModule, MulterModule.register({dest: './upload', storage: diskStorage})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(express.static('uploads/files'))
      .forRoutes('files')
  }
}
