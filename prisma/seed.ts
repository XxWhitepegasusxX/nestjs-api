import { PrismaClient } from "@prisma/client";
import {v4} from "uuid";
const prisma = new PrismaClient()

async function main(){
    await prisma.menu.createMany({
        data: [
            {
                id: v4(),
                type: "daytime",
                created_at: new Date(),
            },
            {
                id: v4(),
                type: "nighttime",
                created_at: new Date(),
            },
        ],
        skipDuplicates: true,
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});