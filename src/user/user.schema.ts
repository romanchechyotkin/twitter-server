import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    _id: mongoose.Types.ObjectId | string;

    @Prop({type: String, required: true, unique: true})
    email: string;

    @Prop({type: String, required: true})
    full_name: string;

    @Prop({type: String, required: true, unique: true})
    user_name: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]})
    follows: User[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]})
    followers: User[];

    @Prop({type: Boolean, default: false})
    isConfirmed: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);

