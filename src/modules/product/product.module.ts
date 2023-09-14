import { Module } from '@nestjs/common';

import { ProductController } from '@controllers/productController/product.controller';
import { ProductService } from '@services/productService/product.service';
import { PrismaService } from '@services/prismaService/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
