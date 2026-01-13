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
    alterEgo.description = alterEgoDto.description;
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
}
