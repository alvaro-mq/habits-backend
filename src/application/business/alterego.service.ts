import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AlterEgoRepository } from './alterego.repository';
import { AlterEgo } from './alterego.entity';
import { CreateAlterEgoDto } from './create-alterego.dto';

@Injectable()
export class AlterEgoService {
  constructor(
    private readonly alterEgoRepository: AlterEgoRepository,
    private readonly userRepository: UserRepository,
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
}
