import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class MessageReadDto {

    @IsNumber()
    @ApiProperty({type: Number})
    chat: number;
}

