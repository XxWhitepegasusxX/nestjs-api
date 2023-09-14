import { Test, TestingModule } from '@nestjs/testing';

import { MenuService } from '@services/menu/menu.service';
import { PrismaService } from '@services/prisma/prisma.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService, PrismaService],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
