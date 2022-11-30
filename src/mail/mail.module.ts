import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailController } from './mail.controller';
import * as path from 'path'

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: 'testtwittermail09@gmail.com',
                    pass: 'bxkxbtkzduczgzhv',
                },
            },
            defaults: {
                from: 'testtwittermail09@gmail.com',
            },
            template: {
                dir: path.join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    controllers: [MailController],
    exports: [MailService]
})
export class MailModule {}
