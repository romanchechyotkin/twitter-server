import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({type: String, required: true, unique: true})
    email: string;

    @Prop({type: String, required: true})
    full_name: string;

    @Prop({type: String, required: true, unique: true})
    user_name: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: Boolean, default: false})
    isConfirmed: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);

