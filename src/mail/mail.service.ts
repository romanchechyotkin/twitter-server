import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {InjectModel} from "@nestjs/mongoose";
import {Mail, MailDocument} from "./mail.schema";
import {Model} from "mongoose";

@Injectable()
export class MailService {

    constructor(@InjectModel(Mail.name) private mailModel: Model<MailDocument>,
                private mailerService: MailerService) {}

    async sendRegistrationEmail(email) {

        await this.mailerService.sendMail({
            to: email,
            from: process.env.SMTP_USER,
            subject: 'Welcome to Nice App!',
            template: './registration.hbs',
            context: {
                name: email.split('@')[0]
            }
        })

        await this.mailModel.create({email: email, template: 'registration'})

    }

}
