// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '3585a01c430586ddc5b54d19c579284c',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      username: payload.username,
      freelancerId: payload.freelancerId,
    };
  }
}
