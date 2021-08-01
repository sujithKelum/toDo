import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(err: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (err instanceof HttpException) {
      if (err.getStatus() === HttpStatus.BAD_REQUEST) {
        response.status(err.getStatus()).json({
          errors: {
            name: err.getResponse()['message'],
            ...err['response']['errors']
          },
          meta: {
            message: 'failed'
          }
        });
      } else {
        response.status(err.getStatus()).json({
          errors: {
            name: err.message,
            disply: err.getResponse()['disply'] ? true : false,
            details: [
              {
                message: err.getResponse()['errorMessage']
                  ? err.getResponse()['errorMessage']
                  : ''
              }
            ]
          },
          meta: {
            message: 'failed'
          }
        });
      }
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: {
          name: 'Internal Server Error',
          disply: false,
          details: [{ message: err.name ? err.name : '' }]
        },
        meta: {
          message: 'failed'
        }
      });
    }
  }
}
