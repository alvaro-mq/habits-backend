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
import { WalkService } from './walk.service';
import { WalkRepository } from './walk.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController, UploadsController],
  providers: [
    PetService,
    CredentialService,
    MemoryService,
    VaccineService,
    WalkService,
    PetRepository,
    UserRepository,
    MemoryRepository,
    VaccineRepository,
    WalkRepository,
  ],
  exports: [
    PetRepository,
    UserRepository,
    MemoryRepository,
    VaccineRepository,
    WalkRepository,
  ],
})
export class PetModule {}
