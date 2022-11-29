import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Tweet } from "./tweet.model";
import { User } from "../user/user.model";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Tweet, User]),
        JwtModule,
        UserModule,
    ],
    controllers: [TweetController],
    providers: [TweetService]
})
export class TweetModule {}
