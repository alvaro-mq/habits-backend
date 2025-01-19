import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Memory } from './memory.entity';

@Injectable()
export class MemoryRepository extends Repository<Memory> {
  constructor(private dataSource: DataSource) {
    super(Memory, dataSource.createEntityManager());
  }

  async createMemory(data: Partial<Memory>): Promise<Memory> {
    const memory = this.create(data);
    return this.save(memory);
  }

  async getMemory(memoryId: string): Promise<Memory> {
    return this.findOne({ where: { id: memoryId } });
  }

  async getMemories(petId: string): Promise<Memory[]> {
    const memories = await this.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
    });

    return memories;
  }
}
