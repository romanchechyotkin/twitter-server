import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto {

    @IsString({message: "must be string type"})
    @IsEmail({}, {message: "incorrect email"})
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @Length(6, 15, {message: 'password must be more than 5 and less than 16 symbols'})
    readonly newPassword: string;

}
