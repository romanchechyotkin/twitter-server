import { Injectable } from '@nestjs/common';
import {Message, MessageDocument} from "./entities/message.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async getMessages(dto) {
        return this.messageModel.find({
            users: {
                $all: [dto.from, dto.to],
            },
        }).sort({updatedAt: 1});
    }

    async sendMessage(dto) {
        const message = await this.messageModel.create({
            text: dto.text,
            to: dto.to,
            from: dto.from,
            users: [dto.from, dto.to]
        });

        return this.messageModel.insertMany(message)
    }

}
