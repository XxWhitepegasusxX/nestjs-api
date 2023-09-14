import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '@services/prismaService/prisma.service';
import { ProductService } from '@services/productService/product.service';
import {v4 as uuidv4} from 'uuid'

class CreateProductDto {
  data: {
    category?: Prisma.CategoryCreateNestedManyWithoutProductsInput;
    menu?: Prisma.MenuCreateNestedManyWithoutProductsInput;
    image?: string;
    name: string;
    description: string;
    price: number;
  }
}

class UpdateProductDto {
  where: {
    id: string;
  };
  data: {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.CategoryUpdateManyWithoutProductsNestedInput;
    menu?: Prisma.MenuUpdateManyWithoutProductsNestedInput;
  }
}

class FindProductProps{
  where: {
    id?: string;
    name?: string;
  }
}

const productArray: Product[] = [
  {id: '1', name: "Product 1", description: "Product 1", price: 10.90, created_at: new Date(), image: 'image'},
  {id: '2', name: "Product 2", description: "Product 2", price: 10.90, created_at: new Date(), image: 'image'},
  {id: '3', name: "Product 3", description: "Product 3", price: 10.90, created_at: new Date(), image: 'image'},
]

const db = {
  product: {
    findMany: jest.fn().mockResolvedValue(productArray),
    findUnique: async (data: FindProductProps) => {
      if(data.where.id){
        const product = productArray.find(product => product.id === data.where.id);
        return product;
      }else{
        const product = productArray.find(product => product.name === data.where.name);
        return product;
      }
    },
    findFirst: jest.fn().mockResolvedValue(productArray[0]),
    create: async ({data}: CreateProductDto) => {
      const newProduct = {
        id: uuidv4(),
        created_at: new Date(),
        image: 'image',
        name: data.name,
        description: data.name,
        price: data.price
      }
      return newProduct;
    },
    save: jest.fn().mockResolvedValue(productArray[0]),
    update: (data: UpdateProductDto) => {
      const product = productArray.find(product => product.id === data.where.id);
      if(data.data){
        const newProduct = {
          ...data.data
        }
        Object.assign(product, newProduct);
      }
      return product;
    },
    delete: (data) => {
      const deletedProduct = productArray.find(product => product.id === data.where.id);
      const newArray = productArray.filter(product => product.id !== data.where.id);
      return deletedProduct;
    },
  }
}

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: PrismaService,
        useValue: db
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
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
