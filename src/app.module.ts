import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './messages/messages.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService) => {
    //     console.log(+config.getOrThrow('DB_PORT'));

    //     return {
    //       type: 'postgres',
    //       host: config.getOrThrow('DB_HOST'),
    //       port: +config.getOrThrow('DB_PORT'),
    //       username: config.getOrThrow('DB_USERNAME'),
    //       database: config.getOrThrow('DB_DATABASE'),
    //       password: config.getOrThrow('DB_PASSWORD'),
    //       ssl: true,
    //       entities: [],
    //       synchronize: config.getOrThrow('ENV') === 'development',
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
