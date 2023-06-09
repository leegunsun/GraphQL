import { Injectable } from '@nestjs/common';

@Injectable()
//test
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
