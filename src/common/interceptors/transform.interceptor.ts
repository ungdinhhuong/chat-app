import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const ctx = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(data => {
        return {
          success: true,
          data,
          message: ctx.statusMessage || 'OK',
          statusCode: ctx.statusCode,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
