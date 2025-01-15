import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';

@Injectable()
export class PetRepository extends Repository<Pet> {
  constructor(private dataSource: DataSource) {
    super(Pet, dataSource.createEntityManager());
  }

  async createPet(data: Partial<Pet>): Promise<Pet> {
    const user = this.create(data);
    return this.save(user);
  }
}
