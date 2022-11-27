import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import { User } from "./user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tweet } from "../tweet/tweet.model";

@Module({
    imports: [
        SequelizeModule.forFeature([User, Tweet])
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}
