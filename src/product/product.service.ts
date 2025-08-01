// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) { }

  async create(createDto: CreateProductDto, adminId: string) {
    const product = this.productRepo.create({
      ...createDto,
      currentStock: createDto.initialStock,
      totalRestocked: createDto.initialStock,
      adminId,
    });
    const saved = await this.productRepo.save(product);
    return saved;
  }

  async findAllByCompany(companyId: string, adminId: string) {
    return this.productRepo.find({ where: { companyId, adminId } });
  }

  async findOne(id: number, adminId: string) {
    const product = await this.productRepo.findOne({ where: { id, adminId } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto, adminId: string) {
    await this.productRepo.update({ id, adminId }, dto);
    return this.findOne(id, adminId);
  }

  async remove(id: number, adminId: string) {
    const result = await this.productRepo.delete({ id, adminId });
    if (!result.affected) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}
