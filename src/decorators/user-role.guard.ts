import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    console.log(token);
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    console.log('payload : ', payload);
    await this.authService.checkIsValidToken(payload._id, token);
    const requiredRoles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    return requiredRoles.includes(payload.role);
  }
}
