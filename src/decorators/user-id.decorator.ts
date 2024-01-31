import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export const UserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const reg = context.switchToHttp().getRequest();
    const decode = jwtDecode(reg.headers.authorization);
    return decode['_id'];
  },
);
