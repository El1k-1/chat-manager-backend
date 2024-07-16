import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
  UnauthorizedException as UnauthorizedExceptionNest,
} from '@nestjs/common';
import { CustomException } from './exceptions/base';
import { Observable, throwError } from 'rxjs';
import { InternalServerCustomException } from './exceptions/internal-exception';
import { UnauthorizedCustomException } from './exceptions/unauthorized-exception';
import { PageNotFoundCustomException } from './exceptions/page-not-found-exception';
import { RollbarLogger } from 'nestjs-rollbar';
import { Logger } from 'nestjs-pino';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly rollbarLogger: RollbarLogger,
    private readonly pinnoLogger: Logger,
  ) {}

  private log(exception: CustomException | Error) {
    this.pinnoLogger.error(exception);
    this.rollbarLogger.error(exception);
  }
  catch(exception: CustomException | Error, argumentsHost: ArgumentsHost): Observable<any> {
    if (argumentsHost.getType() === 'http') {
      const request = argumentsHost.switchToHttp().getResponse();
      if (exception instanceof CustomException) {
        if (exception.status >= 500) {
          this.log(exception);
        }
        return request.status(exception.status).send(exception);
      } else if (exception instanceof UnauthorizedExceptionNest) {
        exception = new UnauthorizedCustomException();
        return request.status(401).send(exception);
      } else if (exception instanceof NotFoundException) {
        exception = new PageNotFoundCustomException(exception.message);
        return request.status(404).send(exception);
      } else {
        exception = new InternalServerCustomException(exception);
        this.log(exception);
        return request.status(500).send(exception);
      }
    }

    return throwError(exception);
  }
}
