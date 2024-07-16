import { ServerCustomException } from './base';

export class UnprocessableDataBaseCustomException extends ServerCustomException {
  constructor(message = 'unprocessable entity') {
    super(message);
  }
}
