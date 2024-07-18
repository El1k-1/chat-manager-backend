import { ApiRespond, Respond } from '@common/response';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './models/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @ApiRespond( Post('add'), Number, {
        summary: 'Создать пользователя',
        status: HttpStatus.OK
    })
    async create(@Body() dto: UserCreateDto): Promise<Respond<Object>> {
        const {id} = await this.service.create(dto)
        return Respond.one({id: id})
    }
}
