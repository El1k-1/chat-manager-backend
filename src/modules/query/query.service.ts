import { UserAuthDto } from '@modules/users/dto/user-auth.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Query } from './models/query.entity';
import { QueryAddDto } from './dto/query-add.dto';
import { QueryUpdateDto } from './dto/query-update.dto';

@Injectable()
export class QueryService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
    public async getList( manager: EntityManager = this.connection.manager) : Promise<Query[]> {
        return manager.find(Query, {
            select: {
                id: true,
                type: {
                    id: true,
					name: true,
					color: true,
					icon: true,
				},
                user: {
					login: true,
					created_at: true,
					email: true,
				},
                car: {
					price: true,
					image: true,
					name: true,
				},
            },
            relations : {
				type: true,
				user: true,
				car: true,
            },
            order: {
                id: 'ASC'
            }
        })
    }
    public async queryAdd( dto: QueryAddDto, manager: EntityManager = this.connection.manager) : Promise<Boolean> {
        return manager.transaction(async(m: EntityManager) => {
            const user = await m.findOneBy(User, {token: dto.token})
            if (user) {
                const query = await m.save(Query,{typeId: 2, user: user, carId: dto.car_id})
                if (query) return true
                else return false
            } else {
                return false
            }

        })
    }

    public async queryUpdate( dto: QueryUpdateDto, manager: EntityManager = this.connection.manager) : Promise<Boolean> {
        return await !!manager.update(Query, {id: dto.id}, {typeId: +dto.status})
    }
}