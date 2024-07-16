import { NotFoundCustomException } from './base';

export class PageNotFoundCustomException extends NotFoundCustomException {
  constructor(message = 'Not Found') {
    super(message);
  }
}
