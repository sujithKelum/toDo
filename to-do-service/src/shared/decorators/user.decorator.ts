import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    try {
      if (request.headers['authorization']) {
        const decoded = jsonwebtoken.decode(
          request.headers.authorization.split(' ')[1]
        );
        return decoded;
      }
      return { sub: 'no-header' };
    } catch (error) {}
  }
);
