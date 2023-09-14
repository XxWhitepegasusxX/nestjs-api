import { Module } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { MenuController } from '../../controllers/menu/menu.controller';
import { PrismaService } from '@services/prisma/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
