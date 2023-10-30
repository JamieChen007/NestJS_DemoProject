import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Response } from 'express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  //上传文件
  @Post('album')
  @UseInterceptors(FilesInterceptor('file', 10))
  upload(@UploadedFiles() file, @Body() json) {
    console.log(file, 'file');
    console.log(json.reqBody, 'json');
    return 'upload success';
  }

  //下载文件 直接以文件形式导出下载到本地
  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1696906566393.png');
    res.download(url);
  }

  //下载文件 流文件形式 需要前端解析
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1696906566393.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=Jamie`);

    tarStream.pipe(res);
  }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
