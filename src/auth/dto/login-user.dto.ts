import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LoginUserDto {

    @IsString({message: "must be string type"})
    @IsEmail({}, {message: "incorrect email"})
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

}
