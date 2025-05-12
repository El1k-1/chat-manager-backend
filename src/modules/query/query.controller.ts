import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryService } from './query.service';
import { Query } from './models/query.entity';
import { QueryAddDto } from './dto/query-add.dto';
import { QueryUpdateDto } from './dto/query-update.dto';

@ApiTags('Query')
@Controller('query')
export class QueryController {
    constructor(private service: QueryService) {}

    @ApiRespond( Get('list'), Number, {
        summary: 'Получение листа заявок',
        status: HttpStatus.OK
    })
    async getList(): Promise<Respond<Query[]>> {
        const result = await this.service.getList()
        return Respond.many(result)
    }

    @ApiRespond( Post('add'), Number, {
            summary: 'Создание заявки',
            status: HttpStatus.OK
        })
        async queryAdd(@Body() dto: QueryAddDto): Promise<Respond<Object>> {
            const result = await this.service.queryAdd(dto)
            if (result) {
                return Respond.ok()
            } else {
                return Respond.notOk()
            }
    }
    @ApiRespond( Post('update'), Number, {
            summary: 'Обновление статуса заявки',
            status: HttpStatus.OK
        })
        async queryUpdate(@Body() dto: QueryUpdateDto): Promise<Respond<Object>> {
            const result = await this.service.queryUpdate(dto)
            if (result) {
                return Respond.ok()
            } else {
                return Respond.notOk()
            }
    }
}
