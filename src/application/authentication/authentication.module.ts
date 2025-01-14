import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthenticationController } from './authentication.controller';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' }), UserModule],
  controllers: [AuthenticationController],
  providers: [GoogleStrategy, ConfigService, UserService],
})
export class AuthenticationModule {}
