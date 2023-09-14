import { Prisma } from "@prisma/client";

export class CreateProductDto {
    data: {
      category?: Prisma.CategoryCreateNestedManyWithoutProductsInput;
      menu?: Prisma.MenuCreateNestedManyWithoutProductsInput;
      image?: string;
      name: string;
      description: string;
      price: number;
    }
  }
  
export class UpdateProductDto {
    where: {
      id: string;
    };
    data: {
      name?: Prisma.StringFieldUpdateOperationsInput | string;
      price?: Prisma.FloatFieldUpdateOperationsInput | number;
      image?: Prisma.StringFieldUpdateOperationsInput | string;
      description?: Prisma.StringFieldUpdateOperationsInput | string;
      category?: Prisma.CategoryUpdateManyWithoutProductsNestedInput;
      menu?: Prisma.MenuUpdateManyWithoutProductsNestedInput;
    }
  }
  
export class FindProductDtos{
    where: {
      id?: string;
      name?: string;
    }
  }