import { Injectable } from '@nestjs/common';
import { Category, Menu, Product } from '@prisma/client';

import { AppError } from '@errors/AppError';
import { PrismaService } from '@services/prisma/prisma.service';
import { CreateProductDto } from '@dtos/product/create-product.dto';
import { UpdateProductDto } from '@dtos/product/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService){}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try{
      const product = await this.prisma.product.create({
        data: createProductDto,
        include: {
          menu: true,
          category: true,
          image: true,
        },
      })
      return product
    }catch(e){
      throw new AppError("Error while creating product: " + e.message)
    }
  }

  async findAll() {
    try{
      const products = await this.prisma.product.findMany({include: {
        menu: true,
        category: true,
        image: true,
      }});
      return products
    }catch(e){
      throw new AppError("Error while querying for all products: " + e.message)
    }
  }

  async findById(id: string) {
    try{
      const product = await this.prisma.product.findUnique({
        where: {id},
        include: {
          menu: true,
          category: true,
          image: true,
        },
      })
      return product
    }catch(e){
      throw new AppError("Error while querying for product: " + e.message)
    }
  }
  
  async findByName(name: string) {
    try{
      const product = await this.prisma.product.findUnique({
        where: {name},
        include: {
          menu: true,
          category: true,
          image: true,
        },
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
        include: {
          menu: true,
          category: true,
          image: true,
        },
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

  async addToMenu(id: string, menuId: string): Promise<Menu> {
    const menu: Menu = await this.prisma.menu.findUnique({ where: {id: menuId} })
    const product: Product = await this.prisma.product.findUnique({ where: { id } })
    if(!menu || !product){
      throw new AppError("Menu or Product not found")
    }
    return await this.prisma.menu.update({
      where: { id: menuId },
      data: {
        products: {
          connect: {
            id
          }
        }
      },
      include: {
        products: true,
      }
    })
  }

  async addToCategory(id: string, categoryId: string): Promise<Category> {
    const product = await this.prisma.product.findUnique({ where: {id} })
    const category = await this.prisma.category.findUnique({ where: {id: categoryId} })
    
    if (!product || !category) {
      throw new AppError("Product or Category not found")
    }
    
    return await this.prisma.category.update({
      where: {id: categoryId},
      include: {
        products: true
      },
      data: {
        products: {
          connect: {
            id
          }
        }
      }
    })
  }

  async addImage(id: string, imageName: string): Promise<Product>{
    try{
      return await this.prisma.product.update({
        where: {id},
        data: {
          image:{
            create: {
             name: imageName, 
            }
          }
        },
        include: {
          image: true,
          menu: true,
          category: true,
        }
      })
    }catch(e){
      throw new AppError("Something went wrong")
    }
  }

}