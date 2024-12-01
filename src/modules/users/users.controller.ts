import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { User } from './models/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCheckDto } from './dto/user-check.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @ApiRespond( Post('auth'), Number, {
        summary: 'Авторизация пользователя',
        status: HttpStatus.OK
    })
    async auth(@Body() dto: UserAuthDto): Promise<Respond<Object>> {
        const result = await this.service.auth(dto)
        if (result) {
            return Respond.one({login: result})
        } else return Respond.notOk()
    }
    @ApiRespond( Post('me'), Number, {
        summary: 'Проверка пользователя',
        status: HttpStatus.OK
    })
    async checkMe(@Body() dto: UserCheckDto): Promise<Respond<Object>> {
        const result = await this.service.checkMe(dto)
        if (result) {
            return Respond.one(result)
        } else return Respond.notOk()
    }

    @ApiRespond( Post('registration'), Number, {
        summary: 'Регистрация пользователя',
        status: HttpStatus.OK
    })
    async registration(@Body() dto: UserAuthDto): Promise<Respond<Object>> {
        const result = await this.service.registration(dto)
        if (result) {
            return Respond.one({result})
        } else {
            return Respond.notOk()
        }
    }
}
