// src/company/company.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/auth/AuthGuard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  async create(@Req() req, @Body() dto: CreateCompanyDto) {
    const data = await this.companyService.create(dto, req.user.id);
    return {
      success: true,
      message: 'Company created successfully',
      data,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies for the logged-in admin' })
  @ApiResponse({ status: 200, description: 'Companies fetched successfully' })
  async findAll(@Req() req) {
    const data = await this.companyService.findAll(req.user.id);
    return {
      success: true,
      message: 'Companies fetched successfully',
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single company by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Company fetched successfully' })
  async findOne(@Req() req, @Param('id') id: string) {
    const data = await this.companyService.findOne(id, req.user.id);
    return {
      success: true,
      message: 'Company fetched successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  async update(@Req() req, @Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    const data = await this.companyService.update(id, dto, req.user.id);
    return {
      success: true,
      message: 'Company updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  async remove(@Req() req, @Param('id') id: string) {
    const data = await this.companyService.remove(id, req.user.id);
    return {
      success: true,
      message: 'Company deleted successfully',
      data,
    };
  }

  @Get('current/logged-in')
  @ApiOperation({ summary: 'Get the current logged-in company' })
  @ApiResponse({ status: 200, description: 'Current logged-in company fetched successfully' })
  @ApiResponse({ status: 404, description: 'No company found' })
  async findCurrentLoggedInCompany(@Req() req) {
    console.log('Fetching current logged-in company for admin:', req.user.id);
    const data = await this.companyService.findCurrentLoggedInCompany(req.user.id);
    return {
      success: true,
      message: 'Current logged-in company fetched successfully',
      data,
    };
  }

  @Patch('current/:id')
  @ApiOperation({ summary: 'Set a company as current logged-in' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Company set as current logged-in successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async setCurrentCompany(@Req() req, @Param('id') id: string) {
    const data = await this.companyService.setCurrentCompany(id, req.user.id);
    return {
      success: true,
      message: 'Company set as current logged-in successfully',
      data,
    };
  }
}
