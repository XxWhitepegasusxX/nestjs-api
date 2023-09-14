import { Prisma } from '@prisma/client';

export class UpdateCategoryDto implements Prisma.CategoryUpdateInput {
    name: string;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
}
