import { InjectRepository } from '@nestjs/typeorm';
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
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer() io: Server;

  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  @SubscribeMessage('send-message')
  async handleMessage(@MessageBody() data: any) {
    console.log('MESSAGE SENT');

    const message = new Message();

    message.author = data.author;
    message.title = data.title;

    await this.messageRepo.save(message);

    console.log(message);

    this.io.emit('send-message', message);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('CONNECTED');

    const messages = await this.messageRepo.find();

    console.log(messages);

    client.emit('load-messages', messages);
  }
}
