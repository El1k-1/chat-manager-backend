import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class ChatReadDto {

    @IsNumber()
    @ApiProperty({type: Number})
    user: number;
}

