import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {TweetModule} from './tweet/tweet.module';
import {AuthModule} from './auth/auth.module';
import {JwtTokenModule} from './jwt-token/jwt-token.module';
import {MailModule} from './mail/mail.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import * as process from "process";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRoot(process.env.MONGO_URI),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        UserModule,
        TweetModule,
        AuthModule,
        JwtTokenModule,
        MailModule
    ],
})

export class AppModule {}
