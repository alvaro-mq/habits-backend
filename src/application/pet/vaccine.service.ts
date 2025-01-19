import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { VaccineRepository } from './vaccine.repository';
import { Vaccine } from './vaccine.entity';
import { VaccineDto } from './vaccine.dto';

@Injectable()
export class VaccineService {
  constructor(
    private readonly vaccineRepository: VaccineRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async createVaccine(
    petId: string,
    vaccineDto: VaccineDto,
    userAudit: string,
  ) {
    const vaccine = new Vaccine();
    vaccine.name = vaccineDto.name;
    vaccine.batchNumber = vaccineDto.batchNumber;
    vaccine.dosage = vaccineDto.dosage;
    vaccine.dateAdministered = vaccineDto.dateAdministered;
    vaccine.manufacturer = vaccineDto.manufacturer;
    vaccine.userCreated = userAudit;

    const pet = await this.petRepository.getPet(petId);
    vaccine.pet = pet;

    return this.vaccineRepository.createVaccine(vaccine);
  }

  async getVaccines(petId: string): Promise<Vaccine[] | null> {
    return this.vaccineRepository.getVaccines(petId);
  }
}
