import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UserRegistrDto {

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    login?: string;

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    password?: string;

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    email?: string;
}