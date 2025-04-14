import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Walk } from './walk.entity';

@Injectable()
export class WalkRepository extends Repository<Walk> {
  constructor(private dataSource: DataSource) {
    super(Walk, dataSource.createEntityManager());
  }

  async createWalk(data: Partial<Walk>): Promise<Walk> {
    const walk = this.create(data);
    return this.save(walk);
  }

  async getWalk(walkId: string): Promise<Walk> {
    return this.findOne({ where: { id: walkId } });
  }

  async getWalks(petId: string): Promise<Walk[]> {
    const walks = await this.find({
      where: { pet: { id: petId } },
      // relations: ['pet'],
    });

    return walks;
  }

  async getWalksSummary(petId: string): Promise<{
    totalDistance: number;
    totalDuration: number;
    totalCount: number;
  }> {
    const result = await this.createQueryBuilder('walk')
      .select('SUM(walk.distance)', 'totalDistance')
      .addSelect('SUM(walk.duration)', 'totalDuration')
      .addSelect('COUNT(walk.id)', 'totalCount')
      .where('walk.petId = :petId', { petId })
      .getRawOne();

    return {
      totalDistance: parseFloat(result.totalDistance) || 0,
      totalDuration: parseInt(result.totalDuration) || 0,
      totalCount: parseInt(result.totalCount) || 0,
    };
  }
}
