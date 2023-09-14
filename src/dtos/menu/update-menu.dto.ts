import { Prisma } from '@prisma/client';

export class UpdateMenuDto implements Prisma.MenuUpdateInput {
    type?: string;
}
