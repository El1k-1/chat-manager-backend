import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UserCreateDto {

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    username?: string;
}