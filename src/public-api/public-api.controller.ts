import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { CreatePublicApiDto } from './dto/create-public-api.dto';
import { UpdatePublicApiDto } from './dto/update-public-api.dto';

@Controller('public-api')
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @Post()
  create(@Body() createPublicApiDto: CreatePublicApiDto) {
    return this.publicApiService.create(createPublicApiDto);
  }

  @Get()
  findAll() {
    return this.publicApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicApiDto: UpdatePublicApiDto) {
    return this.publicApiService.update(+id, updatePublicApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicApiService.remove(+id);
  }
}
