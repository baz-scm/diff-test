import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptor.name);
  private readonly defaultTimeout = 5000; // 5 seconds

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    
    // Allow custom timeout from headers
    const customTimeout = request.headers['x-timeout'];
    const timeoutValue = customTimeout ? parseInt(customTimeout, 10) : this.defaultTimeout;

    this.logger.debug(`Setting timeout of ${timeoutValue}ms for ${method} ${url}`);

    return next.handle().pipe(
      timeout(timeoutValue),
      catchError(err => {
        if (err instanceof TimeoutError) {
          this.logger.warn(`Request timeout after ${timeoutValue}ms for ${method} ${url}`);
          return throwError(() => new RequestTimeoutException(
            `Request timeout after ${timeoutValue}ms`
          ));
        }
        return throwError(() => err);
      }),
    );
  }
}
