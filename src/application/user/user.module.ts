import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [],
  providers: [UserService, UserRepository, RoleRepository],
  exports: [UserRepository, RoleRepository],
})
export class UserModule {}
