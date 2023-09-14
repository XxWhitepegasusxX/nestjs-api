import { Prisma } from '@prisma/client';

export class UpdateProductDto implements Prisma.ProductUpdateInput {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.CategoryUpdateManyWithoutProductsNestedInput;
    menu?: Prisma.MenuUpdateManyWithoutProductsNestedInput;
}