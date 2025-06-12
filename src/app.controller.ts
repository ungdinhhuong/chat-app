import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppException } from 'src/common/exceptions/app.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new AppException("adasd");
    return this.appService.getHello();
  }
}
