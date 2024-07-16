import { ForbiddenCustomException } from './base';

export class ActionForbiddenCustomException extends ForbiddenCustomException {
  constructor(message = 'Forbidden') {
    super(message);
  }
}
