import { Injectable } from '@nestjs/common';

import { CreateMenuDto } from '@dtos/menu/create-menu.dto';
import { UpdateMenuDto } from '@dtos/menu/update-menu.dto';
import { Menu } from '@prisma/client';
import { AppError } from '@errors/AppError';
import { PrismaService } from '@services/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService){}
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    try{
      return await this.prisma.menu.create({data: createMenuDto, include: {products: true}});
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }

  async findAll(): Promise<Menu[]> {
    try{
      return await this.prisma.menu.findMany({include: {products: true}});
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }

  async findOne(id: string): Promise<Menu> {
    try{
      return await this.prisma.menu.findUnique({where: {id}, include: {products: true}});
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }

  async findByType(type: string): Promise<Menu> {
    try{
      return await this.prisma.menu.findUnique({where: {type}, include: {products: true}});
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    try{
      return await this.prisma.menu.update({where: {id}, data: updateMenuDto, include: {products: true}});
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }

  async remove(id: string): Promise<Menu> {
    try{
      return await this.prisma.menu.delete({where: {id}})
    }catch(e){
      throw new AppError("Something went wrong: " + e.message);
    }
  }
}