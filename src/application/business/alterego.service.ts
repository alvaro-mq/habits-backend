import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AlterEgoRepository } from './alterego.repository';
import { AlterEgo } from './alterego.entity';
import { CreateAlterEgoDto } from './create-alterego.dto';
import { UserAlterEgoRepository } from './user-alterego.repository';
import { UserAlterEgo } from './user-alterego.entity';

@Injectable()
export class AlterEgoService {
  constructor(
    private readonly alterEgoRepository: AlterEgoRepository,
    private readonly userRepository: UserRepository,
    private readonly userAlterEgoRepository: UserAlterEgoRepository,
  ) {}

  async createAlterEgo(
    alterEgoDto: Partial<CreateAlterEgoDto>,
    userId: string,
  ): Promise<AlterEgo> {
    const alterEgo = new AlterEgo();
    alterEgo.name = alterEgoDto.name;
    alterEgo.nameFemale = alterEgoDto.nameFemale;
    alterEgo.description = alterEgoDto.description;
    alterEgo.imageUrl = alterEgoDto.imageUrl;
    alterEgo.imageUrlFemale = alterEgoDto.imageUrlFemale;
    alterEgo.customNameFemale = alterEgoDto.customNameFemale;
    alterEgo.userCreated = userId;

    return this.alterEgoRepository.createAlterEgo(alterEgo);
  }

  async findAll(userId: string): Promise<AlterEgo[]> {
    return this.alterEgoRepository.findAllByUserId(userId);
  }

  async updateCustomization(userId: string, alterEgoId: string, customName: string, customImage: string) {
    let userAlterEgo = await this.userAlterEgoRepository.findOne({
      where: { user: { id: userId }, alterEgo: { id: alterEgoId } },
    });

    if (!userAlterEgo) {
      userAlterEgo = new UserAlterEgo();
      userAlterEgo.user = await this.userRepository.findOneBy({ id: userId });
      userAlterEgo.alterEgo = await this.alterEgoRepository.findOneBy({ id: alterEgoId });
      userAlterEgo.userCreated = userId;
    }

    if (customName !== undefined) userAlterEgo.customName = customName;
    if (customImage !== undefined) userAlterEgo.customImage = customImage;

    return this.userAlterEgoRepository.save(userAlterEgo);
  }

  async getRadarStats(userId: string): Promise<any[]> {
    const stats = await this.alterEgoRepository
      .createQueryBuilder('ae')
      .leftJoin('ae.habits', 'hp')
      .leftJoin('hp.habits', 'h', 'h.userId = :userId', { userId })
      .select('ae.name', 'name')
      .addSelect('ae.nameFemale', 'nameFemale')
      .addSelect('COUNT(h.id)', 'count')
      .groupBy('ae.id')
      .addGroupBy('ae.name')
      .addGroupBy('ae.nameFemale')
      .getRawMany();

    return stats.map(s => ({
      name: s.name,
      nameFemale: s.nameFemale,
      count: parseInt(s.count, 10),
    }));
  }

  async getAlterEgoXP(userId: string): Promise<any[]> {
    const stats = await this.alterEgoRepository
      .createQueryBuilder('ae')
      .leftJoin('ae.habits', 'hp')
      .leftJoin('hp.habits', 'h', 'h.userId = :userId', { userId })
      .leftJoin('h.logs', 'hl', 'hl.completed = :completed', { completed: true })
      .select('ae.id', 'id')
      .addSelect('ae.name', 'name')
      .addSelect('ae.imageUrl', 'imageUrl')
      .addSelect('ae.customName', 'customName')
      .addSelect('COUNT(hl.id)', 'xp')
      .addSelect('ae.nameFemale', 'nameFemale')
      .addSelect('ae.customNameFemale', 'customNameFemale')
      .addSelect('ae.imageUrlFemale', 'imageUrlFemale')
      .groupBy('ae.id')
      .addGroupBy('ae.name')
      .addGroupBy('ae.nameFemale')
      .addGroupBy('ae.imageUrl')
      .addGroupBy('ae.imageUrlFemale')
      .addGroupBy('ae.customName')
      .addGroupBy('ae.customNameFemale')
      .getRawMany();

    const customizations = await this.userAlterEgoRepository.find({
      where: { user: { id: userId } },
      relations: ['alterEgo'],
    });

    const customMap = new Map<string, UserAlterEgo>();
    customizations.forEach(c => {
      if (c.alterEgo) customMap.set(c.alterEgo.id, c);
    });

    return stats.map(s => {
      const custom = customMap.get(s.id);
      return {
        id: s.id,
        name: s.name,
        nameFemale: s.nameFemale,
        imageUrl: custom?.customImage || s.imageUrl,
        imageUrlFemale: s.imageUrlFemale,
        customNameFemale: s.customNameFemale,
        xp: parseInt(s.xp, 10),
      };
    });
  }
}
