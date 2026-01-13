import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAlterEgo } from './user-alterego.entity';

@Injectable()
export class UserAlterEgoRepository extends Repository<UserAlterEgo> {
  constructor(private dataSource: DataSource) {
    super(UserAlterEgo, dataSource.createEntityManager());
  }
}
