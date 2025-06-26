import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/interface/rest/common/decorators/api-public.decorator';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    //  getAllAndOverride: Ưu tiên metadata từ method, nếu không có thì lấy từ class
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // method
      context.getClass(), // controller
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token chưa được cung cấp.');
    }

    return (await super.canActivate(context)) as boolean;
  }
}
