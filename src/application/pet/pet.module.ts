import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';
import { UserRepository } from '../user/user.repository';
import { PetController } from './pet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [PetService, PetRepository, UserRepository],
  exports: [PetRepository, UserRepository],
})
export class PetModule {}
