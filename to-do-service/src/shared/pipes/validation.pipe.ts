import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GenerateResponse } from '../helpers/validation.helper';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const customValidatorOptions = {
      validationError: {
        target: false,
        value: false
      }
    };

    const customTransformOptions = {
      enableImplicitConversion: true
    };

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value, customTransformOptions);
    const errors = await validate(object, customValidatorOptions);

    if (errors.length > 0) {
      const errorObj = new GenerateResponse(errors);
      throw new HttpException(
        {
          errors: {
            name: 'Bad Request',
            disply: false,
            details: errorObj.run()
          }
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
