import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ProfileDto } from '../authentication/profile.dto';
import { RoleRepository } from './role.repository';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

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
    provider: string,
  ): Promise<User> {
    const user = new User();
    user.email = profile.email;
    user.username = profile.email;
    user.firstName = profile.firstName;
    user.lastName = profile.lastName;
    user.fullName = profile.fullName;
    user.photo = profile.picture;
    user.oidcId = profile.sub;
    user.oidc = provider;
    user.userCreated = userAud;

    const role = await this.roleRepository.getRoleForName('TUTOR');
    user.role = role;
    return this.userRepository.createUser(user);
  }

  async createCustomUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const existingUser = await this.userRepository.getUserForEmail(email);
    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepository.getRoleForName('TUTOR');

    const newUser = this.userRepository.create({
      username,
      email,
      fullName: 'test',
      password: hashedPassword,
      userCreated: 'admin',
      role,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }

  async updateProfile(userId: string, data: { fullName?: string; photo?: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    if (data.fullName) {
      user.fullName = data.fullName;
    }
    if (data.photo) {
      user.photo = data.photo;
    }

    return this.userRepository.save(user);
  }
}
