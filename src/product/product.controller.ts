// src/product/product.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/auth/AuthGuard';


@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async create(@Body() dto: CreateProductDto, @Req() req) {
    const adminId = req.id;
    const data = await this.productService.create(dto, adminId);
    return {
      success: true,
      message: 'Product created successfully',
      data,
    };
  }

  @Get('company/:companyId')
  @ApiResponse({ status: 200, description: 'List of products by company' })
  async findAllByCompany(@Param('companyId') companyId: string, @Req() req) {
    const data = await this.productService.findAllByCompany(companyId, req.id);
    return {
      success: true,
      message: 'Products fetched successfully',
      data,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Single product detail' })
  async findOne(@Param('id', ParseIntPipe) id, @Req() req) {
    const data = await this.productService.findOne(id, req.id);
    return {
      success: true,
      message: 'Product fetched successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() dto: UpdateProductDto,
    @Req() req
  ) {
    const data = await this.productService.update(id, dto, req.id);
    return {
      success: true,
      message: 'Product updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id, @Req() req) {
    const data = await this.productService.remove(id, req.id);
    return {
      success: true,
      message: 'Product deleted successfully',
      data,
    };
  }
}
