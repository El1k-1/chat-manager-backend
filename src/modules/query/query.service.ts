import { UserAuthDto } from '@modules/users/dto/user-auth.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Query } from './models/query.entity';
import { QueryAddDto } from './dto/query-add.dto';

@Injectable()
export class QueryService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
    public async getList( manager: EntityManager = this.connection.manager) : Promise<Query[]> {
        return manager.find(Query)
    }
    public async queryAdd( dto: QueryAddDto, manager: EntityManager = this.connection.manager) : Promise<Query | Boolean> {
        return manager.transaction(async(m: EntityManager) => {
            const user = await manager.findOneBy(User, {token: dto.token})
            if (!user) {
                const query = m.save(Query,{typeId: 1, fromUser: user, carId: dto.car_id})
                return query
            } else {
                return false
            }

        })
    }
}