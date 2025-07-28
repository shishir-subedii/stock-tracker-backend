import { Injectable } from '@nestjs/common';
import { CreatePublicApiDto } from './dto/create-public-api.dto';
import { UpdatePublicApiDto } from './dto/update-public-api.dto';

@Injectable()
export class PublicApiService {
  create(createPublicApiDto: CreatePublicApiDto) {
    return 'This action adds a new publicApi';
  }

  findAll() {
    return `This action returns all publicApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicApi`;
  }

  update(id: number, updatePublicApiDto: UpdatePublicApiDto) {
    return `This action updates a #${id} publicApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicApi`;
  }
}
