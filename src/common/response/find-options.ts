import { ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, IsEmpty } from 'class-validator';

export class FindOptions {
  @ApiPropertyOptional({ type: Number, default: 20 })
  @IsOptional()
  @IsInt()
  @Max(100)
  public readonly limit?: number;

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsInt()
  public readonly page?: number;

  // Only in response
  @ApiResponseProperty({ type: Number })
  @IsEmpty()
  public readonly count: number;
}
