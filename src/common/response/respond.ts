import { ApiResponseProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { FindOptions } from './find-options';

export class Respond<T = any> {
  @ApiResponseProperty({ type: Boolean })
  public readonly success: boolean;

  @ApiResponseProperty({ type: String })
  public readonly status: HttpStatus;

  @ApiResponseProperty({ type: Object })
  public readonly data?: T;

  @ApiResponseProperty({ type: Object })
  public readonly findOptions?: FindOptions;

  constructor(success: boolean, status: HttpStatus, message?: string, data?: T) {
    this.success = success;
    this.status = status;
    this.data = data;
  }

  static ok(): Respond {
    return {
      success: true,
      status: HttpStatus.OK,
    };
  }

  static one<T>(data: T): Respond<T> {
    return {
      success: true,
      status: HttpStatus.OK,
      data,
    };
  }

  static many<T>(data: T, findOptions: FindOptions): Respond<T> {
    return {
      success: true,
      status: HttpStatus.OK,
      data,
      findOptions,
    };
  }
}
