import { IsNotEmpty, Length } from "class-validator";

export class CreateTweetDto {

    @IsNotEmpty()
    @Length(0, 255, {message: 'text must be more less than 256 symbols'})
    readonly text: string;

}
