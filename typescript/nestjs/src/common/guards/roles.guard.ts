import { CanActivate, ExecutionContext, Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    
    if (!requiredRoles || requiredRoles.length === 0) {
      this.logger.debug('No roles required for this endpoint');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn('No user found in request');
      throw new ForbiddenException('Access denied: No user authentication');
    }

    if (!user.roles || !Array.isArray(user.roles)) {
      this.logger.warn(`User ${user.id || 'unknown'} has no roles assigned`);
      throw new ForbiddenException('Access denied: No roles assigned');
    }

    const hasRequiredRole = user.roles.some(userRole =>
      requiredRoles.includes(userRole)
    );

    if (!hasRequiredRole) {
      this.logger.warn(
        `User ${user.id || 'unknown'} with roles [${user.roles.join(', ')}] ` +
        `attempted to access endpoint requiring roles [${requiredRoles.join(', ')}]`
      );
      throw new ForbiddenException('Access denied: Insufficient permissions');
    }

    this.logger.debug(
      `User ${user.id || 'unknown'} authorized with roles [${user.roles.join(', ')}]`
    );
    
    return true;
  }
}
