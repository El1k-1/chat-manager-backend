import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { User } from './models/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCheckDto } from './dto/user-check.dto';
import { UserRegistrDto } from './dto/user-registr.dto';

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
            return Respond.one({token: result})
        } else return Respond.notOk()
    }
    @ApiRespond( Post('me'), Number, {
        summary: 'Проверка пользователя',
        status: HttpStatus.OK
    })
    async checkMe(@Body() dto: UserCheckDto): Promise<Respond<Object>> {
        const user = await this.service.checkMe(dto)
        if (user?.login) {
            return Respond.one({login: user.login ,permission_id: user?.permission_id})
        } else return Respond.notOk()
    }

    @ApiRespond( Post('registration'), Number, {
        summary: 'Регистрация пользователя',
        status: HttpStatus.OK
    })
    async registration(@Body() dto: UserRegistrDto): Promise<Respond<Object>> {
        const result = await this.service.registration(dto)
        if (result) {
            return Respond.one({token: result})
        } else {
            return Respond.notOk()
        }
    }
}
