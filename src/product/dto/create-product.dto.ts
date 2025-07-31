import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'SKU12345' })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty({ example: 1000 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @Min(0)
    initialStock: number;

    @ApiProperty({ example: 5 })
    @IsNumber()
    reorderLevel: number;

    @ApiProperty({ example: '1234-abcd' })
    @IsString()
    companyId: string;
}
