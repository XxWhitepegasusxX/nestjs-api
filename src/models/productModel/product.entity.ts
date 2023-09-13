export type ProductProps = {
    id: string | number,
    price: number,
    name: string,
    image: string,
    description: string,
    categories: string[],
}

export class Product {
    constructor(props: ProductProps) {
        Object.assign(this, props);
    }
    
    id: string | number;
    price: number;
    name: string;
    image: string;
    description: string;
    categories: string[]
}