import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Tweet } from "./tweet.model";
import { User } from "../user/user.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Tweet, User])
    ],
    controllers: [TweetController],
    providers: [TweetService]
})
export class TweetModule {}
