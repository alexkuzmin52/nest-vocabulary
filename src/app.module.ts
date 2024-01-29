import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlashCardModule } from './modules/flash-card/flash-card.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogModule } from './modules/log/log.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configurarion';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { FilesModule } from './modules/files/files.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { LogService } from './modules/log/log.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/.${process.env.NODE_ENV}.dev`,
      load: [configuration],
    }),
    // MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forRoot('mongodb://localhost:27017/my-vocabulary'),
    FlashCardModule,
    UserModule,
    AuthModule,
    LogModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    LogService,
  ],
})
export class AppModule {}
