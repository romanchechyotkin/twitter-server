import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { UserModule } from "../user/user.module";
import { JwtTokenModule } from "../jwt-token/jwt-token.module";
import { MailModule } from "../mail/mail.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule, JwtTokenModule, MailModule]
})

export class AuthModule {}
