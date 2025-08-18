import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
  Logger,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ValidationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, type, data } = metadata;
    
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    this.logger.debug(`Validating ${type} parameter: ${data || 'body'}`);
    
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });

    if (errors.length > 0) {
      const errorMessages = this.formatErrors(errors);
      this.logger.warn(`Validation failed: ${JSON.stringify(errorMessages)}`);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    return object;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private formatErrors(errors: ValidationError[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    
    errors.forEach(error => {
      if (error.constraints) {
        result[error.property] = Object.values(error.constraints);
      }
      
      if (error.children && error.children.length > 0) {
        const childErrors = this.formatErrors(error.children);
        Object.keys(childErrors).forEach(key => {
          result[`${error.property}.${key}`] = childErrors[key];
        });
      }
    });

    return result;
  }
}
