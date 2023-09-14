import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@controllers/productController/product.controller';
import { ProductService } from '@services/productService/product.service';
import { PrismaService } from '@services/prismaService/prisma.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
