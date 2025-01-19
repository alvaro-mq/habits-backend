import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from './profile.dto';
import { LoginDto } from './login.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Genera un token JWT para un usuario autenticado.
   * @param user Datos del usuario.
   * @returns El token JWT.
   */
  generateJwt(user: ProfileDto): string {
    const payload = {
      sub: user.sub,
      username: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Método para generar el JWT
  async login(user: User) {
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para autenticar con usuario y contraseña
  async loginWithCredentials(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.login(user);
  }
}
