import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from '@controllers/menu/menu.controller';
import { MenuService } from '@services/menu/menu.service';
import { PrismaService } from '@services/prisma/prisma.service';

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, PrismaService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
