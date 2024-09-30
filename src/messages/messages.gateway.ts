import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer() io: Server;

  constructor() {}

  @SubscribeMessage('ping')
  handleMessage(@MessageBody() data) {
    this.io.emit('ping', { ...data, id: Math.random() });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.io.emit('conections', this.io.sockets.sockets.size);

    client.emit('load-messages', []);
  }
}
