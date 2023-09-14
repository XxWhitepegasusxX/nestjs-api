import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { MenuService } from '@services/menu/menu.service';
import { CreateMenuDto } from '@dtos/menu/create-menu.dto';
import { UpdateMenuDto } from '@dtos/menu/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get('now')
  async findByType(){
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 18) {
      return await this.menuService.findByType("daytime");
    } else {
      return await this.menuService.findByType("nighttime");
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.menuService.remove(id);
  }
}
