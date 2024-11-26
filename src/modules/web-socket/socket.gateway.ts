import {MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from "@nestjs/websockets"
import { Server } from 'socket.io';

@WebSocketGateway( 9001,
  {
    cors: {
      origin: '*'
    },
  }
)
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): WsResponse<object> {
    console.log(data)
    return {event: 'events', data: {type: 'res', value: data}}
  }
  
  handleConnection(client: any, ...args: any[]) {
    console.log(client.handshake.headers.origin)
  }

}