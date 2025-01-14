import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ProfileDto } from '../authentication/profile.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserForEmail(email);
  }

  async createUser(
    profile: Partial<ProfileDto>,
    userAud: string,
  ): Promise<User> {
    const user = new User();
    user.email = profile.email;
    user.username = profile.email;
    user.firstName = profile.firstName;
    user.lastNAme = profile.lastName;
    user.fullName = profile.fullName;
    user.photo = profile.picture;
    user.userCreated = userAud;

    const role = await this.roleRepository.getRoleForName('TUTOR');
    user.role = role;
    return this.userRepository.createUser(user);
  }
}
