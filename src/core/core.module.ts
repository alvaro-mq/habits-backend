import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';

@Module({
  imports: [ConfigurationModule],
  exports: [],
})
export class CoreModule {}
