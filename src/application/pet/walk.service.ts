import { Injectable } from '@nestjs/common';
import { PetRepository } from './pet.repository';
import { WalkDto } from './walk.dto';
import { Walk } from './walk.entity';
import { WalkRepository } from './walk.repository';

@Injectable()
export class WalkService {
  constructor(
    private readonly walkRepository: WalkRepository,
    private readonly petRepository: PetRepository,
  ) {}

  async createWalk(petId: string, walkDto: WalkDto, userAudit: string) {
    const walk = new Walk();
    // walk.route = walkDto.route;
    walk.description = walkDto.description;
    walk.gpxFile = walkDto.gpxFile;
    walk.distance = walkDto.distance;
    walk.duration = walkDto.duration;
    walk.date = walkDto.date;
    walk.location = walkDto.location;
    walk.userCreated = userAudit;

    const pet = await this.petRepository.getPet(petId);
    walk.pet = pet;

    return this.walkRepository.createWalk(walk);
  }

  async getWalk(walkId: string) {
    return this.walkRepository.getWalk(walkId);
  }

  async getWalks(petId: string): Promise<Walk[] | null> {
    return this.walkRepository.getWalks(petId);
  }

  async getWalkSummary(petId: string) {
    return this.walkRepository.getWalksSummary(petId);
  }
}
