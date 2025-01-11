import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return this.productRepository.save(product);
  }
  async updateProduct(id: string, dto: UpdateProductDto) {
    return this.productRepository.update(id, dto);
  }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        isDeleted: false
      }
    });
  }


  async deleteProduct(id: string): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Soft delete - just update the isDeleted flag
    product.isDeleted = true;
    await this.productRepository.save(product);

    return { message: `Product with ID ${id} has been deleted successfully` };


  }
}
