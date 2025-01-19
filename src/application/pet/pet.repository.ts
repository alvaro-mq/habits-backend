import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';

@Injectable()
export class PetRepository extends Repository<Pet> {
  constructor(private dataSource: DataSource) {
    super(Pet, dataSource.createEntityManager());
  }

  async createPet(data: Partial<Pet>): Promise<Pet> {
    const pet = this.create(data);
    return this.save(pet);
  }

  async getPet(petId: string): Promise<Pet> {
    return this.findOne({ where: { id: petId } });
  }

  async getPets(userId: string): Promise<Pet[]> {
    const pets = await this.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });

    return pets;
  }
}
