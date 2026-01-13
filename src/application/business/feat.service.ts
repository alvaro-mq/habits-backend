import { Injectable, NotFoundException } from '@nestjs/common';
import { FeatRepository } from './feat.repository';
import { FeatParamRepository } from './feat-param.repository';
import { Feat } from './feat.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class FeatService {
  constructor(
    private readonly featRepository: FeatRepository,
    private readonly featParamRepository: FeatParamRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findAllParams() {
    return this.featParamRepository.find();
  }

  async createFeat(
    userId: string,
    data: {
      featParamId: string;
      description: string;
      urlImage: string;
      date?: string;
    },
  ): Promise<Feat> {
    const [user, featParam] = await Promise.all([
      this.userRepository.findOne({ where: { id: userId } }),
      this.featParamRepository.findOne({ where: { id: data.featParamId } }),
    ]);

    if (!user) throw new NotFoundException('User not found');
    if (!featParam) throw new NotFoundException('FeatParam not found');

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const feat = new Feat();
    feat.user = user;
    feat.featParam = featParam;
    feat.description = data.description;
    feat.urlImage = data.urlImage;
    feat.date = data.date || today;
    feat.userCreated = userId;

    return this.featRepository.createFeat(feat);
  }

  async findLatest(userId: string): Promise<Feat> {
    return this.featRepository.findOne({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      relations: ['featParam'],
    });
  }

  async findAllByUser(userId: string): Promise<Feat[]> {
    return this.featRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      relations: ['featParam'],
    });
  }
}
