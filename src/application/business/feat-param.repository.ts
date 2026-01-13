import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FeatParam } from './feat-param.entity';

@Injectable()
export class FeatParamRepository extends Repository<FeatParam> {
  constructor(private dataSource: DataSource) {
    super(FeatParam, dataSource.createEntityManager());
  }
}
