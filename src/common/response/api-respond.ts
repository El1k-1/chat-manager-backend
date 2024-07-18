import { applyDecorators, HttpCode, HttpStatus, Type } from "@nestjs/common";
import { ApiDescription } from "./api-description";
import { includes, isNil, isArray } from "lodash";
import { Respond } from "./respond";
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, getSchemaPath } from "@nestjs/swagger";

interface IApiRespondOption {
  status?: HttpStatus;
  description?: ApiDescription | string;
  isArray?: boolean;
  summary?: string;
  param?: string;
}

  export const ApiRespond = <DataDto extends Type<unknown>>(
    method: MethodDecorator,
    dto: DataDto,
    options?: IApiRespondOption,
  ) => {
    return applyDecorators(
      ApiExtraModels(Respond, Map<string, string[]>, isNil(dto) ? String: dto),
      method,
      HttpCode(options?.status || HttpStatus.OK),
      ApiOperation({ summary: options?.summary}),
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
    )
  }