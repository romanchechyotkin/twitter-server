import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class EmailValidation {

    @IsString({message: "must be string type"})
    @IsEmail({}, {message: "incorrect email"})
    readonly email: string;

}

export class PasswordValidation {

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @Length(6, 15, {message: 'password must be more than 5 and less than 16 symbols'})
    readonly newPassword: string;

}

export class UserNamesDto {

    @Length(0, 50, {message: 'maximum 50 characters', always: false})
    readonly full_name: string;

    @Length(1, 15, {message: 'maximum 15 characters', always: false})
    readonly user_name: string;

}

