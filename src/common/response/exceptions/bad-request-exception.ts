import { ClientCustomException } from './base';

export class BadRequestCustomException extends ClientCustomException {
  constructor(message = 'Bad request') {
    super(message);
  }
}
