import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MailDocument = HydratedDocument<Mail>;

@Schema()
export class Mail {

    @Prop()
    email: string;

    @Prop()
    template: string;

    @Prop({default: new Date()})
    date: Date;

}

export const MailSchema = SchemaFactory.createForClass(Mail);
