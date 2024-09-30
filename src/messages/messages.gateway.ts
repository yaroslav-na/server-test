import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  @WebSocketServer() io: Server;

  @SubscribeMessage('ping')
  handleMessage(@MessageBody() data, @ConnectedSocket() client: Socket) {
    this.io.emit('ping', { ...data, id: Math.random() });
  }
}
