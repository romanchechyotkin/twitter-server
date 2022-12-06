import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { Tweet, TweetSchema } from "./tweet.schema";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Tweet.name, schema: TweetSchema}]),
        JwtModule,
        UserModule,
    ],
    controllers: [TweetController],
    providers: [TweetService]
})
export class TweetModule {}
