import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { CreateCategoryDto } from '@dtos/category/create-category.dto';
import { UpdateCategoryDto } from '@dtos/category/update-category.dto';
import { PrismaService } from '@services/prisma/prisma.service';
import { AppError } from '@errors/AppError';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService){}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category>{
    try{
      return await this.prisma.category.create({
        data: createCategoryDto
      });
    }catch(e){
      throw new AppError("Error creating category: " + e.message)
    }
  }

  async findAll(): Promise<Category[]> {
    try{
      return await this.prisma.category.findMany({include: {products: true}})
    }catch(e){
      throw new AppError("Error getting categories: " + e.message)
    }
  }

  async findOne(id: string): Promise<Category> {
    try{
      return await this.prisma.category.findUnique({where: {id}, include: {products: true}})
    }catch(e){
      throw new AppError("Error finding category: " + e.message)
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>{
    try{
      return await this.prisma.category.update({
        where: {id},
        data: updateCategoryDto,
        include: {
          products: true
        }
      })
    }catch(e){
      throw new AppError("Error updating category: " + e.message)
    }
  }

  async remove(id: string) {
    try{
      return await this.prisma.category.delete({where: {id}})
    }catch(e){
      throw new AppError("Error removing category: " + e.message)
    }
  }
}
