import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';
import { EntityManager } from 'typeorm';
import { ChatCreateDto } from './dto/chat-create.dto';
import { Chat } from './models/chat.entity';
import { ChatReadDto } from './dto/chat-read.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
    public async create(dto: ChatCreateDto, manager: EntityManager = this.connection.manager) : Promise<Chat> {
        return manager.transaction(async(m: EntityManager) => {
            const chat = await m.create(Chat, dto)
            
            const users = await m.findBy(User, {id: In([...(dto.users)])})

            const isExist = await m.existsBy(Chat, { users: users});

            if (isExist){
                throw new HttpException('Chat already exists',HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (!users.length) {
                throw new HttpException('Users not found',HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            chat.users = users;

            return  m.save(chat);
            })
        } 

        public async getChats(
            dto : ChatReadDto,
            manager: EntityManager = this.connection.manager
            ): Promise<Chat[] | null>{
            return manager.find(Chat,{
                relations:{
                    users:true,
                    messages: true,
                },
                where: {
                    users: {
                        id: dto.user,
                    }
                },
                order: {
                    messages: {
                        created_at: "DESC"
                    }
                }
            })
        }
    }

