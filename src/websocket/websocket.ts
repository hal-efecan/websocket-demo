/* eslint-disable prettier/prettier */
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Websocket implements OnModuleInit {
  constructor() {}
  @WebSocketServer()
  server: Server;

  // Initial connection to server
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Socket id: ${socket.id} - Has connected!`);
    });
  }

  // Subscribes to "newMessage" event sent from the client
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);

    // Emits an "onMessage" event when a msj is recieved from a connected client
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
  }
}
