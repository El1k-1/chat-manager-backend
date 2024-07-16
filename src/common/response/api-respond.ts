/* eslint-disable prettier/prettier */
import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiDescription } from './api-description';
import { Respond } from './respond';
import { includes, isNil } from 'lodash';;
export interface IAuthGuardNamed {
  guardName: string;
}

interface IApiRespondOptions {
  status?: HttpStatus;
  description?: ApiDescription | string;
  isArray?: boolean;
  summary?: string;
  param?: string;
}

//isArray default false
export const ApiRespond = <DataDto extends Type<unknown>>(
  method: MethodDecorator,
  dto: DataDto,
  options?: IApiRespondOptions,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  return applyDecorators(
    ApiExtraModels(Respond, Map<string, string[]>, isNil(dto) ? String : dto),
    method,
    HttpCode(options?.status || HttpStatus.OK),
    // eslint-disable-next-line unicorn/no-negated-condition
          ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: ApiDescription.UNAUTHORIZED,
            schema: {
              required: ['success', 'status', 'message', 'data'],
              properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                status: {
                  type: 'number',
                  example: 401,
                },
                message: {
                  type: 'string',
                  example: 'Unauthorized',
                },
              },
            },
          }),
    ApiOperation({ summary: options?.summary }),
    ...(isNil(options?.param) ? [] : [ApiParam({ name: options?.param || 'param', required: true, type: 'string' })]),
    ApiOkResponse({
      status: options?.status || HttpStatus.OK,
      description: options?.description || ApiDescription.OK,
      schema: {
        required: ['success', 'status', 'message'],
        properties: {
          success: {
            type: 'boolean',
          },
          status: {
            type: 'number',
            example: 200,
          },
          message: {
            type: 'string',
          },
          data: isNil(dto)
            // eslint-disable-next-line unicorn/no-null
            ? { type: 'string' }
            : (options?.isArray
              ? {
                  oneOf: [
                    { type: 'array', items: { $ref: getSchemaPath(dto) } },
                    { $ref: getSchemaPath(Map<string, string[]>) },
                  ],
                }
              : {
                  oneOf: [
                    {
                      ...(dto.name === 'Number' && { type: 'number' }),
                      ...(dto.name === 'String' && { type: 'string' }),
                      ...(dto.name === 'Boolean' && { type: 'boolean' }),
                      ...(!includes(['Number', 'String', 'Boolean'], dto.name) && { $ref: getSchemaPath(dto) }),
                    },
                    { $ref: getSchemaPath(Map<string, string[]>) },
                  ],
                }),
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: ApiDescription.BAD_REQUEST,
      schema: {
        required: ['success', 'status', 'message', 'data'],
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          status: {
            type: 'number',
            example: 400,
          },
          message: {
            type: 'string',
            example: 'Bad request',
          },
          data: { $ref: getSchemaPath(Map<string, string[]>) },
        },
      },
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: ApiDescription.INTERNAL_SERVER_ERROR,
      schema: {
        required: ['success', 'status', 'message', 'data'],
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          status: {
            type: 'number',
            example: 500,
          },
          message: {
            type: 'string',
            example: 'Internal server error',
          },
        },
      },
    }),
  );
};
