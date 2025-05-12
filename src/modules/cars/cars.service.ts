import { UserAuthDto } from '@modules/users/dto/user-auth.dto';
import { User } from '@modules/users/models/user.entity';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cars } from './models/cars.entity';

@Injectable()
export class CarsService {
    constructor(
        @InjectDataSource()
        private readonly connection: DataSource
    ) {}
    public async getList( manager: EntityManager = this.connection.manager) : Promise<Cars[]> {
        return manager.find(Cars)
    }
    public async getCar( id: number, manager: EntityManager = this.connection.manager) : Promise<Cars> {
        const car = await manager.findOneBy(Cars, {id})
        if (car) {
            return car
        } else return null
    }
}