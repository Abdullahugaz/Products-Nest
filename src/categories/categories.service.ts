import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Liiska categories oo dhan
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { is_deleted: false },
    });
  }

  // Hal category
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id, is_deleted: false });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  // Create category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // Update category
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id, is_deleted: false });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  // Soft delete
  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id, is_deleted: false });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    category.is_deleted = true;
    await this.categoryRepository.save(category);
  }
}
