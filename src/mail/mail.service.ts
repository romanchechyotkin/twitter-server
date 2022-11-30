import {Injectable} from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

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
    }

}
