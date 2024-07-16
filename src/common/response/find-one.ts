import { Type } from 'class-transformer';
import { IsNumberString } from 'class-validator';

export class FindOne {
  @IsNumberString()
  @Type(() => Number)
  id: number;
}
