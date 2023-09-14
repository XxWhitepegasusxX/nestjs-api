import { Prisma } from "@prisma/client";

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
    name: string;
    products?: Prisma.ProductCreateNestedManyWithoutCategoryInput;
}
