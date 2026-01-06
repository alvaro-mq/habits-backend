import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UploadsController } from './upload/upload.controller';

@Module({
  imports: [ConfigurationModule],
  exports: [],
  controllers: [UploadsController]
})
export class CoreModule {}
