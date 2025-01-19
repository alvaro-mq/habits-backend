import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Memory } from './memory.entity';
import { Vaccine } from './vaccine.entity';

@Injectable()
export class VaccineRepository extends Repository<Vaccine> {
  constructor(private dataSource: DataSource) {
    super(Memory, dataSource.createEntityManager());
  }

  async createVaccine(data: Partial<Vaccine>): Promise<Vaccine> {
    const vaccine = this.create(data);
    return this.save(vaccine);
  }

  async getVaccine(vaccineId: string): Promise<Vaccine> {
    return this.findOne({ where: { id: vaccineId } });
  }

  async getVaccines(petId: string): Promise<Vaccine[]> {
    const vaccines = await this.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
    });

    return vaccines;
  }
}
