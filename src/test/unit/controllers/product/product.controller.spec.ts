import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '@controllers/product/product.controller';
import { ProductService } from '@services/product/product.service';
import { PrismaService } from '@services/prisma/prisma.service';
import db from '../../db';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, {
        provide: PrismaService,
        useValue: db
      }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create products', async () => {
    const product = await controller.create({
      name: "Produto",
      description: "Mais um produto",
      price: 10.90
    })
    expect(product.name).toBe("Produto")
  })

  it('should return all products', async () => {
    const products = await controller.findAll()
    expect(products).toBeInstanceOf(Array);
  })

  it("should return a unique product", async () => {
    const id = "1"
    const product = await controller.findOne(id)
    expect(product.name).toBe("Product 1")
  })

  it("should be able to update a product", async () => {
    const id = "1"
    const data = {
      name: "Product 5",
    }
    const product = await controller.update(id, data)
    expect(product.id).toBe(id)
    expect(product.name).toBe("Product 5")
  })

  it("shoul be able to delete a product", async () => {
    const id = "2"
    const deletedProduct = await controller.remove(id)
    expect(deletedProduct.name).toBe("Product 2")
  })

});
