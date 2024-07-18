import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class MessageCreateDto {

    @IsNumber()
    @ApiProperty({type: Number})
    chatId: number;

    @IsString()
    @Length(1,256)
    @ApiProperty({type: String})
    text: string

    @IsNumber()
    @ApiProperty({type: Number})
    userId: number;


}

