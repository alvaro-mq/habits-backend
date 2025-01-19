import { Injectable } from '@nestjs/common';
import { MemoryRepository } from './memory.repository';
import { MemoryDto } from './memory.dto';
import { Memory } from './memory.entity';
import { PetRepository } from './pet.repository';

@Injectable()
export class MemoryService {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async createMemory(petId: string, memoryDto: MemoryDto, userAudit: string) {
    const memory = new Memory();
    memory.title = memoryDto.title;
    memory.description = memoryDto.description;
    memory.date = memoryDto.date;
    memory.imageUrl = memoryDto.imageUrl;
    memory.userCreated = userAudit;

    const pet = await this.petRepository.getPet(petId);
    memory.pet = pet;

    return this.memoryRepository.createMemory(memory);
  }

  async getMemories(petId: string): Promise<Memory[] | null> {
    return this.memoryRepository.getMemories(petId);
  }
}
