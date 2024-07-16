import { ServerCustomException } from './base';

export class InternalServerCustomException extends ServerCustomException {
  constructor(error: Error) {
    super('internal server error', { name: error.name, message: error.message });
  }
}
