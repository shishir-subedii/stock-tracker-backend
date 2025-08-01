// src/product/dto/create-product.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    initialStock: number;

    @ApiProperty()
    @IsNumber()
    reorderLevel: number;

    @ApiProperty()
    @IsString()
    companyId: string;
}
