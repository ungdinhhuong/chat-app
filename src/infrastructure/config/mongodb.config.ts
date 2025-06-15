import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppException } from 'src/interface/rest/common/exceptions/app.exception';

export class MongodbConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): MongooseModuleFactoryOptions {
    const config =
      this.configService.get<MongooseModuleFactoryOptions>('database.mongodb');
    if (!config) {
      throw new AppException('MongoDB configuration not found');
    }
    return config;
  }
}
