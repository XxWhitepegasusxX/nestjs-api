import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, Req } from '@nestjs/common';

import { ProductService } from '@services/product/product.service';
import { CreateProductDto } from '@dtos/product/create-product.dto';
import { UpdateProductDto } from '@dtos/product/update-product.dto';
import { AddToDto } from '@dtos/product/add-to.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { diskStorage } from 'multer';
import multerConfig from 'src/utils/multer-config';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Get(':name')
  async findOneByName(@Param('name') name: string){
    return await this.productService.findByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Put('menu/:id')
  async addToMenu(@Param('id') id: string, @Body() data: AddToDto){
    return await this.productService.addToMenu(id, data.menuId);
  }

  @Put('category/:id')
  async addToCategory(@Param('id') id: string, @Body() data: AddToDto){
    return await this.productService.addToCategory(id, data.categoryId);
  }

  @Put('/image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async addImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Param('id') id: string){
    console.log('file', file)
    return await this.productService.addImage(id, file, req);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
