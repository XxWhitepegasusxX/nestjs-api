import { Module } from '@nestjs/common';
import { ProductService } from '../../services/productService/product.service';
import { ProductController } from '../../controllers/productController/product.controller';
import { PrismaService } from '@services/prismaService/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
