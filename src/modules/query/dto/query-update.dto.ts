import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class QueryUpdateDto {

    @IsNumber()
    @ApiProperty({type: Number})
    id?: number;

    @IsNumber()
    @ApiProperty({type: Number})
    status?: number;
}