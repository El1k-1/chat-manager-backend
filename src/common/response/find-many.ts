import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FindOptionsWhere } from 'typeorm';
import { FindOptions } from './find-options';

export class FindMany<T extends object> {
  @ApiPropertyOptional({ type: Object as unknown as T })
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/ban-types
  @Type(() => Object as Function)
  public readonly filter?: FindOptionsWhere<T>;

  @ApiPropertyOptional({ type: FindOptions })
  @IsOptional()
  @Type(() => FindOptions)
  public readonly findOptions?: FindOptions;
}
