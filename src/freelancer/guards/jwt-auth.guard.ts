import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      return false;
    }

    try {
      const verifiedUser = this.validateToken(token);
      request.user = verifiedUser;
      return super.canActivate(context);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    return token;
  }

  private validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
