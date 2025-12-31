import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [AuthenticationModule, UserModule, BusinessModule],
})
export class ApplicationModule {}
