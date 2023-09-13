import { Module } from '@nestjs/common';
import { ProductService } from '../../services/productService/product.service';
import { ProductController } from '../../controllers/productController/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
