import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiRespond, Respond } from '@common/response';
import { MessageCreateDto } from './dto/message-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessageReadDto } from './dto/message-readdto';
import { Message } from './models/message.entity';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {}

    @ApiRespond( Post('add'), Number, {
        summary: 'Создать сообщение',
        status: HttpStatus.OK
    })
    async create(@Body() dto: MessageCreateDto): Promise<Respond<Object>> {
        const {id} = await this.service.create(dto)
        return Respond.one({id: id})
    }

    @ApiRespond( Post('get'), MessageReadDto, {
        summary: 'Получить сообщения чата',
        status: HttpStatus.OK,
        isArray: true,
    })
    async getMany(@Body() dto : MessageReadDto): Promise<Respond<Message[]>> {
        const chats = await this.service.getMessages(dto)
        return Respond.many(chats)
    }
}
