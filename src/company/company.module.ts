import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
