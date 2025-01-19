import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';
import { UserRepository } from '../user/user.repository';
import { PetController } from './pet.controller';
import { UploadsController } from './upload.controller';
import { CarnetService } from './carnet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController, UploadsController],
  providers: [PetService, CarnetService, PetRepository, UserRepository],
  exports: [PetRepository, UserRepository],
})
export class PetModule {}
