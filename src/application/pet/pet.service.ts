import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { UserRepository } from '../user/user.repository';
import { Pet } from './pet.entity';
import { PetDto } from './pet.dto';

@Injectable()
export class PetService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async createPet(petDto: Partial<PetDto>, userEmail: string): Promise<Pet> {
    const pet = new Pet();
    pet.name = petDto.name;
    pet.species = petDto.species;
    pet.breed = petDto.breed;
    pet.sex = petDto.sex;
    pet.birthDate = new Date(petDto.birthDate).toISOString();
    pet.color = petDto.color;
    pet.size = petDto.size;
    pet.userCreated = userEmail;

    const user = await this.userRepository.getUserForEmail(userEmail);
    pet.owner = user;
    return this.petRepository.createPet(pet);
  }
}
