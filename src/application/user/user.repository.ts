import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserForEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.create(data);
    return this.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.findOne({
      where: { id },
      select: ['id', 'oidcId', 'username', 'fullName', 'email', 'photo', 'gender'],
    });
  }
}
