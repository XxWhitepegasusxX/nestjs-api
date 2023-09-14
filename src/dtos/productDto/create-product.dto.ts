import { Prisma } from "@prisma/client";

export class CreateProductDto implements Prisma.ProductCreateInput {
    category?: Prisma.CategoryCreateNestedManyWithoutProductsInput;
    menu?: Prisma.MenuCreateNestedManyWithoutProductsInput;
    image?: string;
    name: string;
    description: string;
    price: number;
}