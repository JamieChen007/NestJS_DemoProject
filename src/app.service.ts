import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!Jamie!';
  }
  getHelloPost(): string {
    return 'Hello World!Jamie!Post!';
  }
}
