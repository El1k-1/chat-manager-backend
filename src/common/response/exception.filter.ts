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

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {


  catch(exception: CustomException | Error, argumentsHost: ArgumentsHost): Observable<any> {
    if (argumentsHost.getType() === 'http') {
      const request = argumentsHost.switchToHttp().getResponse();
      if (exception instanceof CustomException) {

        return request.status(exception.status).send(exception);
      } else if (exception instanceof UnauthorizedExceptionNest) {
        exception = new UnauthorizedCustomException();
        return request.status(401).send(exception);
      } else if (exception instanceof NotFoundException) {
        exception = new PageNotFoundCustomException(exception.message);
        return request.status(404).send(exception);
      } else {
        exception = new InternalServerCustomException(exception);
        return request.status(500).send(exception);
      }
    }
    return throwError(exception);
  }
}
