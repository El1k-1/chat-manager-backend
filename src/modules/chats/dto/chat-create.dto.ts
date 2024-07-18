import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsString, Length} from "class-validator";

class AddUserToChat {
    id: number;
}

export class ChatCreateDto {

    @IsString()
    @Length(2, 64)
    @ApiProperty({type: String})
    name?: string;

    @IsArray()
    @ArrayMinSize(2)
    @ApiProperty({type: AddUserToChat})
    users: AddUserToChat[]
}

