import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from 'src/interface/rest/common/exceptions/app.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi không xác định';
    let trace: string[] | undefined;
    let location: string | undefined;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null && 'message' in res) {
        const msg = (res as { message: string | string[] }).message;
        message = Array.isArray(msg) ? msg.join(', ') : msg;
      }
    } else if (exception instanceof AppException) {
      httpStatus = HttpStatus.OK;
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (process.env.NODE_ENV !== 'production' && request.query?.debug !== undefined) {
      const stack = (exception instanceof Error && exception.stack) || '';
      trace = stack.split('\n');
      location = typeof trace[1] === 'string' ? trace[1].trim() : undefined;
    }

    const body: any = {
      success: false,
      message,
      data: null,
    };

    if (trace) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      body.trace = trace;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      body.location = location;
    }

    response.status(httpStatus).json(body);
  }
}
