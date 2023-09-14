import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../../../../controllers/category/category.controller';
import { CategoryService } from '../../../../services/category/category.service';
import { PrismaService } from '@services/prisma/prisma.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
