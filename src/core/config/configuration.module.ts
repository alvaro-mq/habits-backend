import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DataBaseModule],
  providers: [ConfigService],
})
export class ConfigurationModule {}
