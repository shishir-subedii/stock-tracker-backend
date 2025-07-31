// src/company/dto/create-company.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({ example: 'OpenAI Inc.' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Leading AI research company' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
