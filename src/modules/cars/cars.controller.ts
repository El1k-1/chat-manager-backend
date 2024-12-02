import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { Cars } from './models/cars.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private service: CarsService) {}

    @ApiRespond( Get('list'), Number, {
        summary: 'Авторизация пользователя',
        status: HttpStatus.OK
    })
    async getList(): Promise<Respond<Cars[]>> {
        const result = await this.service.getList()
        return Respond.many(result)

    }

    @ApiRespond( Get(':id'), Number, {
        summary: 'Авторизация пользователя',
        status: HttpStatus.OK,
        param: 'id'
    })
    async getCar(@Param('id') carId: number): Promise<Respond<Cars>> {
        const result = await this.service.getCar(carId)
        if (result) {
            return Respond.one(result)
        } else return Respond.notOk()

    }
}
