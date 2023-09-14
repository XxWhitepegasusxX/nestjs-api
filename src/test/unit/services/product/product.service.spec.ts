import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { PrismaService } from '@services/prisma/prisma.service';
import { ProductService } from '@services/product/product.service';
import db from '../../db';


describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: PrismaService,
        useValue: db
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //READ ALL
  it('should list all products', async () => {
    const products = await service.findAll();
    expect(products).toHaveLength(3);
  })

  //READ ONE
  it('should read one product by id', async () => {
    const id: string = "1"
    const product: Product = await service.findById(id);
    expect(product.name).toBe("Product 1")
  });

  it('should read one product by name', async () => {
    const name = "Product 1"
    const product: Product = await service.findByName(name);
    expect(product.name).toBe("Product 1")
  });

  // CREATE
  it('should create a new product', async () => {
    const product = await service.create({
      name: 'Product 4',
      description: 'Product 4',
      price: 11
    });
    expect(product.name).toBe('Product 4');
  })

  // UPDATE
  it('should update a product', async () => {
    const data = {
      name: "Product 5"
    }
    const id = "1"
    const productUpdated = await service.update(id, data);
    expect(productUpdated.id).toBe(id);
    expect(productUpdated.name).toBe("Product 5");
  })

  it("should delete a product", async () => {
    const id = "1"
    const deletedProduct = await service.remove(id);
    expect(deletedProduct.id).toBe(id);
  })
});
