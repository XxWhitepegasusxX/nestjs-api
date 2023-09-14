import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { AppError } from '@errors/AppError';
import { PrismaService } from '@services/prismaService/prisma.service';
import { CreateProductDto } from '@dtos/productDto/create-product.dto';
import { UpdateProductDto } from '@dtos/productDto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService){}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try{
      const product = await this.prisma.product.create({
        data: createProductDto,
      })
      return product
    }catch(e){
      throw new AppError("Error while creating product: " + e.message)
    }
  }

  async findAll() {
    try{
      const products = await this.prisma.product.findMany();
      return products
    }catch(e){
      throw new AppError("Error while querying for all products: " + e.message)
    }
  }

  async findById(id: string) {
    try{
      const product = await this.prisma.product.findUnique({
        where: {id}
      })
      return product
    }catch(e){
      throw new AppError("Error while querying for product: " + e.message)
    }
  }
  
  async findByName(name: string) {
    try{
      const product = await this.prisma.product.findUnique({
        where: {name}
      })
      return product
    }catch(e){
      throw new AppError("Error while querying for product: " + e.message)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try{
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto
      })
      return updatedProduct
    }catch(e){
      throw new AppError("Error updating product: " + e.message);
    }
  }

  async remove(id: string): Promise<Product> {
    try{
      const deletedProduct = await this.prisma.product.delete({
        where: {
          id
        }
      })
      return deletedProduct;
    }catch(e){
      throw new AppError("Error removing product: " + e.message);
    }
  }
}
