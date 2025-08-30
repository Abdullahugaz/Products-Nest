import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Fetch all products (active only)
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      where: { is_deleted: false },
      relations: ['category'],
    });
  }

  // Fetch single product by id (active only)
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found.`);
    return product;
  }

  // Create new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  // Update product (active only)
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, is_deleted: false },
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found.`);

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  // Hard delete product (completely remove from database)
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found.`);

    await this.productRepository.delete(id);
  }
}
