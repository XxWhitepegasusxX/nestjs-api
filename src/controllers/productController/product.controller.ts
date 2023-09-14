import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateProductDto } from '@dtos/productDto/create-product.dto';
import { UpdateProductDto } from '@dtos/productDto/update-product.dto';
import { ProductService } from '@services/productService/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get(':name')
  findOneByName(@Param('name') name: string){
    return this.productService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
