import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileDto } from './profile.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Genera un token JWT para un usuario autenticado.
   * @param user Datos del usuario.
   * @returns El token JWT.
   */
  generateJwt(user: ProfileDto): string {
    const payload = { sub: user.sub, email: user.email, photo: user.picture };
    return this.jwtService.sign(payload);
  }
}
