import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CoreModule, ApplicationModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
