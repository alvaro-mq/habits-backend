import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Feat } from './feat.entity';

@Injectable()
export class FeatRepository extends Repository<Feat> {
  constructor(private dataSource: DataSource) {
    super(Feat, dataSource.createEntityManager());
  }

  async createFeat(data: Partial<Feat>): Promise<Feat> {
    const feat = this.create(data);
    return this.save(feat);
  }
}
