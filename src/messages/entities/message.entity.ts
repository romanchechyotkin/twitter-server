import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "../../user/user.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema({timestamps: true})
export class Message {

    _id: mongoose.Types.ObjectId | string;

    @Prop({type: String, required: true})
    text: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    to: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    from: User

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
    users: User[]

}

export const MessageSchema = SchemaFactory.createForClass(Message);
