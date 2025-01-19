import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';
import { UserRepository } from '../user/user.repository';
import { PetController } from './pet.controller';
import { UploadsController } from './upload.controller';
import { CredentialService } from './credential.service';
import { MemoryService } from './memory.service';
import { MemoryRepository } from './memory.repository';
import { VaccineRepository } from './vaccine.repository';
import { VaccineService } from './vaccine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController, UploadsController],
  providers: [
    PetService,
    CredentialService,
    MemoryService,
    VaccineService,
    PetRepository,
    UserRepository,
    MemoryRepository,
    VaccineRepository,
  ],
  exports: [PetRepository, UserRepository, MemoryRepository, VaccineRepository],
})
export class PetModule {}
