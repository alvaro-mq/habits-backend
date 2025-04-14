import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { AdviceRepository } from './advice.repository';
import { Advice } from './advice.entity';
import { AdviceDto } from './advice.dto';

@Injectable()
export class AdviceService {
  constructor(
    private readonly adviceRepository: AdviceRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async createAdvice(adviceDto: AdviceDto, userAudit: string) {
    const advice = new Advice();
    advice.title = adviceDto.title;
    advice.description = adviceDto.description;
    advice.imageUrl = adviceDto.imageUrl;
    advice.group = adviceDto.group;
    advice.userCreated = userAudit;

    return this.adviceRepository.createAdvice(advice);
  }

  async getAdvice(adviceId: string): Promise<Advice | null> {
    return this.adviceRepository.getAdvice(adviceId);
  }
}
