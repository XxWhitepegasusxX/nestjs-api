import { Product } from "@prisma/client";
import {v4 as uuidv4} from 'uuid'

import { CreateProductDto, FindProductDtos, UpdateProductDto } from "./dtos/productDtos";

const productArray: Product[] = [
    {id: '1', name: "Product 1", description: "Product 1", price: 10.90, created_at: new Date()},
    {id: '2', name: "Product 2", description: "Product 2", price: 10.90, created_at: new Date()},
    {id: '3', name: "Product 3", description: "Product 3", price: 10.90, created_at: new Date()},
]

const db = {
    product: {
        findMany: jest.fn().mockResolvedValue(productArray),
        findUnique: async (data: FindProductDtos) => {
            if (data.where.id) {
                const product = productArray.find(product => product.id === data.where.id);
                return product;
            } else {
            const product = productArray.find(product => product.name === data.where.name);
            return product;
            }
        },
        findFirst: jest.fn().mockResolvedValue(productArray[0]),
        create: async ({data}: CreateProductDto) => {
            const newProduct = {
                id: uuidv4(),
                created_at: new Date(),
                image: 'image',
                name: data.name,
                description: data.name,
                price: data.price
            }
            return newProduct;
        },
        save: jest.fn().mockResolvedValue(productArray[0]),
        update: (data: UpdateProductDto) => {
            const product = productArray.find(product => product.id === data.where.id);
            if(data.data){
            const newProduct = {
                ...data.data
            }
            Object.assign(product, newProduct);
            }
            return product;
        },
        delete: (data) => {
            const deletedProduct = productArray.find(product => product.id === data.where.id);
            const newArray = productArray.filter(product => product.id !== data.where.id);
            return deletedProduct;
        },
    }
}

export default db;