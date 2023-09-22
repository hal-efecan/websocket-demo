/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Websocket } from './websocket';

@Module({
  providers: [Websocket],
})
export class WebsocketModule {}
