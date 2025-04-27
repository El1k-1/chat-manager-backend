import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryService } from './query.service';
import { Query } from './models/query.entity';
import { QueryAddDto } from './dto/query-add.dto';

@ApiTags('Query')
@Controller('query')
export class QueryController {
    constructor(private service: QueryService) {}

    @ApiRespond( Get('list'), Number, {
        summary: 'Авторизация пользователя',
        status: HttpStatus.OK
    })
    async getList(): Promise<Respond<Query[]>> {
        const result = await this.service.getList()
        return Respond.many(result)

    }

    @ApiRespond( Post('registration'), Number, {
            summary: 'Регистрация пользователя',
            status: HttpStatus.OK
        })
        async registration(@Body() dto: QueryAddDto): Promise<Respond<Object>> {
            const result = await this.service.queryAdd(dto)
            if (result) {
                return Respond.one({token: result})
            } else {
                return Respond.notOk()
            }
    }
}
