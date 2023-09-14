import { Prisma } from "@prisma/client";

export class CreateMenuDto implements Prisma.MenuCreateInput{
    id?: string;
    type: string;
    created_at?: string | Date;
    products?: Prisma.ProductCreateNestedManyWithoutMenuInput;
}
