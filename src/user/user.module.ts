import { Module } from "@nestjs/common";
import {UserController} from './user.controller';
import {UserService} from './user.service';
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";

@Module({
    imports: [
        JwtModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {}
