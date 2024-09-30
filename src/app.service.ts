import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  getHello(): string {
    return 'Hello World from server! ' + this.config.get('DB_PORT');
  }
  async deleteMessages() {
    await this.messageRepo.clear();
  }
}
