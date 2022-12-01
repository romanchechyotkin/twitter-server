import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class RegistrationUserDto {

    @IsString({message: "must be string type"})
    @IsEmail({}, {message: "incorrect email"})
    readonly email: string;

    @IsNotEmpty()
    @Length(6, 15, {message: 'password must be more than 5 and less than 16 symbols'})
    readonly password: string;

    @IsNotEmpty()
    @Length(0, 50, {message: 'maximum 50 characters'})
    readonly full_name: string;

    @IsNotEmpty()
    @Length(0, 15, {message: 'maximum 15 characters'})
    readonly user_name: string;

}
