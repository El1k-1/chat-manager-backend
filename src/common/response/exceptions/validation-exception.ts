import { ValidationError } from '@nestjs/common';
import { ClientCustomException } from './base';
import { values } from 'lodash';

const makeCause = (errors: ValidationError[]): { [key: string]: string } => {
  const result = {};
  for (const error of errors) {
    result[error.property] = values(error.constraints);
  }
  return result;
};

export class ValidationCustomException extends ClientCustomException {
  constructor(errors: ValidationError[]) {
    super('Bad request', makeCause(errors));
  }
}
