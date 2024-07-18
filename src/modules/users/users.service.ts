import { UserCreateDto } from '@modules/users/dto/user-create.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
     public async create(dto: UserCreateDto, manager: EntityManager = this.connection.manager) : Promise<User> {
        return manager.transaction(async(m: EntityManager) => {
            const isExist = await m.existsBy(User, { username: dto.username });
            if (isExist){
                throw new HttpException('User already exists',HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await m.save(User,dto);
        } )
     }
}