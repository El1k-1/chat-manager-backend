import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { ApiRespond, Respond } from '@common/response';
import { ChatCreateDto } from './dto/chat-create.dto';
import { Chat } from './models/chat.entity';
import { ChatReadDto } from './dto/chat-read.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
    constructor(private service: ChatsService) {}

    @ApiRespond( Post('add'), Number, {
        summary: 'Создать чат',
        status: HttpStatus.OK
    })
    async create(@Body() dto: ChatCreateDto): Promise<Respond<Object>> {
        const {id} = await this.service.create(dto)
        return Respond.one({id: id})
    }

    @ApiRespond( Post('get'), ChatReadDto, {
        summary: 'Получить чаты',
        status: HttpStatus.OK,
        isArray: true,
    })
    async getMany(@Body() dto : ChatReadDto): Promise<Respond<Chat[]>> {
        const chats = await this.service.getChats(dto)
        return Respond.many(chats)
    }
}
