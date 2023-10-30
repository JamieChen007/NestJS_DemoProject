import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MysqltestService } from './mysqltest.service';
import { CreateMysqltestDto } from './dto/create-mysqltest.dto';
import { UpdateMysqltestDto } from './dto/update-mysqltest.dto';

@Controller('mysqltest')
export class MysqltestController {
  constructor(private readonly mysqltestService: MysqltestService) {}

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; userId: number }) {
    return this.mysqltestService.addTags(params);
  }

  @Post()
  create(@Body() createMysqltestDto: CreateMysqltestDto) {
    return this.mysqltestService.create(createMysqltestDto);
  }

  @Get()
  findAll() {
    return this.mysqltestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mysqltestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMysqltestDto: UpdateMysqltestDto,
  ) {
    return this.mysqltestService.update(+id, updateMysqltestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mysqltestService.remove(+id);
  }
}
