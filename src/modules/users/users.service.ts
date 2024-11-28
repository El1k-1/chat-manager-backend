import { UserCreateDto } from '@modules/users/dto/user-create.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}

     public async login(dto: UserLoginDto, manager: EntityManager = this.connection.manager) : Promise<Object> {
        return manager.transaction(async(m: EntityManager) => {
            const user = await m.findOneBy(User, { username: dto.login, password: dto.password });
            if (!user){
                return {code: 2}
            }
            return {code: 1, user: user.username};
        } )
     }
}