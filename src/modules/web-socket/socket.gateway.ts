import {ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from "@nestjs/websockets"
import { Server, Socket } from 'socket.io';

@WebSocketGateway( 9001,
  {
    cors: {
      origin: '*'
    },
  }
)
export class SocketGateway {
  clientsCount = 0

  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('events')
  handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any): WsResponse<object> {
    const {type, value, login} = data
    if (value.includes('/help'))
      return {event: 'events', data: {type: 'message', value: `Доступные команды: /users /hiAll /send {message}`}}

    if (value.includes('/users'))
      return {event: 'events', data: {type: 'message', value: `Подключено пользователей ${this.clientsCount}`}}

    if (value.includes('/hiAll'))
      return {event: 'events', data: {type: 'message', value: `Всем привет!`}}
    
      
    if (type === 'message') {
      return {event: 'events', data: {type: 'message', value: value}}
    }
      
  }
  handleConnection(client: any, ...args: any[]) {
    this.clientsCount++
    console.log('connect')
  }
  handleDisconnect(client: any, ...args: any[]) {
    this.clientsCount--
    console.log('disconnec')
  }

}