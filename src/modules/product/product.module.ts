import { Module } from '@nestjs/common';

import { ProductController } from '@controllers/product/product.controller';
import { ProductService } from '@services/product/product.service';
import { PrismaService } from '@services/prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
