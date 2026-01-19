import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AlterEgo } from './alterego.entity';

@Injectable()
export class AlterEgoRepository extends Repository<AlterEgo> {
  constructor(private dataSource: DataSource) {
    super(AlterEgo, dataSource.createEntityManager());
  }

  async createAlterEgo(data: Partial<AlterEgo>): Promise<AlterEgo> {
    const alterEgo = this.create(data);
    return this.save(alterEgo);
  }

  async findAllByUserId(userId: string): Promise<AlterEgo[]> {
    return this.find({
      where: [{ userCreated: userId }, { userCreated: 'admin' }],
      relations: ['habits'],
      select: {
        id: true,
        name: true,
        customName: true,
        description: true,
        imageUrl: true,
        habits: {
          id: true,
          name: true,
          description: true,
          icon: true,
        },
      },
    });
  }
}
