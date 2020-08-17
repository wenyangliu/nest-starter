import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refactor: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.refactor.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const { user } = request.query;

    return !!roles.find(role => role === user);
  }
}
