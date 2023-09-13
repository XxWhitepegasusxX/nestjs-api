import { Product } from "../../../../src/models/productModel/product.entity";

describe('Product test', () => {
    it('should create a product', () => {
        const product = new Product({
            id: 1,
            price: 24.90,
            name: 'bebida',
            image: 'image',
            description: 'description',
            categories: ['category'],
        });
        expect(product.id).toBe(1);
        expect(product.name).toBe('bebida');
    })

})