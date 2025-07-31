// src/company/company.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) { }

  async create(dto: CreateCompanyDto, adminId: string) {
    const company = this.companyRepo.create({
      ...dto,
      apiKey: randomUUID(),
      adminId,
    });
    return this.companyRepo.save(company);
  }

  findAll(adminId: string) {
    return this.companyRepo.find({ where: { adminId } });
  }

  async findOne(id: string, adminId: string) {
    const company = await this.companyRepo.findOne({
      where: { id, adminId },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto, adminId: string) {
    const company = await this.findOne(id, adminId);
    Object.assign(company, dto);
    return this.companyRepo.save(company);
  }

  async remove(id: string, adminId: string) {
    const company = await this.findOne(id, adminId);
    if (!company) throw new NotFoundException('Company not found');
    return this.companyRepo.remove(company);
  }
  async findCurrentLoggedInCompany(adminId: string) {
    console.log('Finding current logged in company for admin:', adminId);

    const company = await this.companyRepo.findOne({
      where: { adminId },
    });

    if (!company) throw new NotFoundException('No company found');

    const currentCompany = await this.companyRepo.findOne({
      where: { isCurrentLoggedIn: true, adminId },
    });

    if (!currentCompany) {
      company.isCurrentLoggedIn = true;
      await this.companyRepo.save(company);
    }

    return company;
  }


  async setCurrentCompany(id: string, adminId: string) {
    const company = await this.findOne(id, adminId);
    if (!company) throw new NotFoundException('Company not found');

    // Reset all companies to not current
    await this.companyRepo.update({ adminId }, { isCurrentLoggedIn: false });

    // Set the selected company as current
    company.isCurrentLoggedIn = true;
    return this.companyRepo.save(company);
  }
}
