import { Module } from '@nestjs/common';

import { CategoryController } from '@controllers/category/category.controller';
import { CategoryService } from '@services/category/category.service';
import { PrismaService } from '@services/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
