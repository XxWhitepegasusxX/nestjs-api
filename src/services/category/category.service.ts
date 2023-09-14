import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '@dtos/category/create-category.dto';
import { UpdateCategoryDto } from '@dtos/category/update-category.dto';
import { PrismaService } from '@services/prisma/prisma.service';
import { AppError } from '@errors/AppError';
import { Category } from '@prisma/client';

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
      return await this.prisma.category.findMany()
    }catch(e){
      throw new AppError("Error getting categories: " + e.message)
    }
  }

  async findOne(id: number) {
    try{

    }catch(e){
      throw new AppError("Error creating category: " + e.message)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{

    }catch(e){
      throw new AppError("Error creating category: " + e.message)
    }
  }

  async remove(id: number) {
    try{

    }catch(e){
      throw new AppError("Error creating category: " + e.message)
    }
  }
}
