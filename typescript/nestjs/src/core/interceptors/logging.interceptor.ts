import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, ip } = request;
    const userAgent = request.get('User-Agent') || '';
    
    const now = Date.now();
    const requestId = this.generateRequestId();
    
    this.logger.log(
      `[${requestId}] Incoming Request: ${method} ${url} - ${ip} - ${userAgent}`
    );

    return next.handle().pipe(
      tap((data) => {
        const responseTime = Date.now() - now;
        const { statusCode } = response;
        
        this.logger.log(
          `[${requestId}] Outgoing Response: ${method} ${url} ${statusCode} - ${responseTime}ms`
        );
        
        if (responseTime > 1000) {
          this.logger.warn(
            `[${requestId}] Slow request detected: ${responseTime}ms for ${method} ${url}`
          );
        }
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        this.logger.error(
          `[${requestId}] Request failed: ${method} ${url} - ${responseTime}ms`,
          error.stack
        );
        return throwError(() => error);
      }),
    );
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
