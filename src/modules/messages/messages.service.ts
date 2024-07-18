import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';
import { MessageCreateDto } from './dto/message-create.dto';
import { Message } from './models/message.entity';
import { Chat } from '@modules/chats/models/chat.entity';
import { User } from '@modules/users/models/user.entity';
import { MessageReadDto } from './dto/message-readdto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
     public async create(dto: MessageCreateDto, manager: EntityManager = this.connection.manager) : Promise<Message> {
        return manager.transaction(async(m: EntityManager) => {
            const queryBuilder: SelectQueryBuilder<Chat> = m.createQueryBuilder(Chat, 'chat')
            const chat = await queryBuilder
            .leftJoinAndSelect('chat.users','users')
            .where('chat.id = :id', {id: dto.chatId})
            .getOne()

            if (!chat){
                throw new HttpException('Chat not found',HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const userExistsInChat = chat.users.find(x => x.id === dto.userId);
            if(!userExistsInChat){
                throw new HttpException('User cant write in this chat',HttpStatus.INTERNAL_SERVER_ERROR);
            }
                
            if (await !m.existsBy(User, { id: dto.userId})){
                throw new HttpException('User not found',HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return await m.save(Message,dto);
        } )
     }

     public async getMessages(
        dto : MessageReadDto,
        manager: EntityManager = this.connection.manager
        ): Promise<Message[] | null>{
            const chat = await manager.findOneBy(Chat, {id: dto.chat})
            if(!chat){
                throw new HttpException('Chat not found',HttpStatus.INTERNAL_SERVER_ERROR);
            }
        return await manager.findBy(Message, {chatId: dto.chat})
    }
}
