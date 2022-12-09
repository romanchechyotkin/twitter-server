import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import  {User} from "../user/user.schema";

export type TweetDocument = HydratedDocument<Tweet>;

@Schema({timestamps: true})
export class Tweet {

    @Prop({type: String, required: true})
    text: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    likes: User[]

}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
