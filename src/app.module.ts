import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user/user.model";
import {TweetModule} from './tweet/tweet.module';
import {Tweet} from "./tweet/tweet.model";
import {AuthModule} from './auth/auth.module';
import {JwtTokenModule} from './jwt-token/jwt-token.module';
import {MailModule} from './mail/mail.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '5432',
            database: "twitter",
            synchronize: true,
            autoLoadModels: true,
            models: [User, Tweet],
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        UserModule,
        TweetModule,
        AuthModule,
        JwtTokenModule,
        MailModule
    ],
})

export class AppModule {}
