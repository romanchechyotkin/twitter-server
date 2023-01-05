import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayDisconnect, OnGatewayConnection, ConnectedSocket
} from '@nestjs/websockets';
import {MessagesService} from './messages.service';
import {Server, Socket} from "socket.io";

class GetMessageDto {
    to: string;
    from: string;
}

class SendMessageDto {
    to: string;
    from: string;
    text: string;
}

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    constructor(private messagesService: MessagesService) {}

    @SubscribeMessage('getMessages')
    getMessages(@MessageBody() dto: GetMessageDto) {
        return this.messagesService.getMessages(dto)
    }

    @SubscribeMessage('sendMessage')
    async sendMessage(
        @MessageBody() dto: SendMessageDto,
        @ConnectedSocket() client: Socket
    ) {
        const message = await this.messagesService.sendMessage(dto)

        this.server.emit("message", message)

        return message
    }

    handleDisconnect(client: Socket) {
        console.log(`Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Connected ${client.id}`);
    }

}
