import { UserAuthDto } from '@modules/users/dto/user-auth.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCheckDto } from './dto/user-check.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
    public async hashPassword(passsword, salt = 10) : Promise<string>  {
         return await bcrypt.hash(passsword, salt)
    }
    public async auth(dto: UserAuthDto, manager: EntityManager = this.connection.manager) : Promise<string> {
        const user = await manager.findOneBy(User, {login: dto.login})
        if(user) {
            if (await bcrypt.compare(dto.password, user.token)) {
                return user.token
            } else return ''
        } else return ''
    
    }
    public async checkMe(dto: UserCheckDto, manager: EntityManager = this.connection.manager) : Promise<User> {
        const user = await manager.findOneBy(User, {token: dto.token})
        if (user) {
            return user
        } else return null
    
    }
    public async registration(dto: UserAuthDto, manager: EntityManager = this.connection.manager) : Promise<string> {
        return manager.transaction(async(m: EntityManager) => {
            const user = await manager.existsBy(User, {login: dto.login})
            if (!user) {
                const token = await this.hashPassword(dto.password)
                m.save(User,{...dto, token, permission_id: 1, })
                return token
            } else {
                return ''
            }

        })

    }
}