import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UserCheckDto {

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    token?: string;

}