import { ApiProperty } from "@nestjs/swagger";
import { isNumber, IsString, Length } from "class-validator";

export class QueryAddDto {

    @IsString()
    @Length(2, 128)
    @ApiProperty({type: String})
    token?: string;

    @ApiProperty({type: Number})
    car_id?: number;
}