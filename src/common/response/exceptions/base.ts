import { Respond } from '../respond';
import { HttpStatus } from '@nestjs/common';

export type CustomExceptionData = Map<string, string[]>;

export abstract class CustomException extends Respond<CustomExceptionData> {
  constructor(message: string, cause?: any, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(false, status, message, cause);
  }
}

export abstract class AuthenticationCustomException extends CustomException {
  constructor(message: string, cause?: any) {
    super(message, cause, HttpStatus.UNAUTHORIZED);
  }
}

export abstract class ForbiddenCustomException extends CustomException {
  public readonly status = HttpStatus.FORBIDDEN;
}

export abstract class NotFoundCustomException extends CustomException {
  public readonly status = HttpStatus.NOT_FOUND;
}

export abstract class ClientCustomException extends CustomException {
  public readonly status = HttpStatus.BAD_REQUEST;
}

export abstract class ServerCustomException extends CustomException {
  public readonly status = HttpStatus.INTERNAL_SERVER_ERROR;
}
