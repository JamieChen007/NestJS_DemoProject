import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: '/main',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getHelloPost(): string {
    return this.appService.getHelloPost();
  }
}
