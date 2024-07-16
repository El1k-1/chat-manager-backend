import { AuthenticationCustomException } from './base';

export class UnauthorizedCustomException extends AuthenticationCustomException {
  constructor(message = 'unauthorized') {
    super(message);
  }
}
