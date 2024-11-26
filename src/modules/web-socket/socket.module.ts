import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketGateway } from './socket.gateway';
import { User } from '../users/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [SocketGateway]
})
export class SocketModule {}
