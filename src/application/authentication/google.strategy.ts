import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ProfileDto } from './profile.dto';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthenticationService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails, displayName, photos, id } = profile;

    const userProfile = new ProfileDto();
    userProfile.sub = id;
    userProfile.accessToken = accessToken;
    userProfile.email = emails[0].value;
    userProfile.fullName = displayName;
    userProfile.picture = photos[0].value;
    userProfile.firstName = name.givenName;
    userProfile.lastName = name.familyName;
    userProfile.refreshToken = refreshToken;

    const jwt = this.authService.generateJwt(userProfile);

    // Retornar el JWT junto con los datos del usuario
    return { ...userProfile, token: jwt };

    // done(null, userProfile);
  }
}
