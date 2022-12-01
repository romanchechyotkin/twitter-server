import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {RegistrationUserDto} from "./dto/registration-user.dto";
import {UserService} from "../user/user.service";
import {LoginUserDto} from "./dto/login-user.dto";
import * as bcrypt from 'bcryptjs'
import { JwtTokenService } from "../jwt-token/jwt-token.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtTokenService: JwtTokenService,
                private mailService: MailService) {}

    async registration(dto: RegistrationUserDto) {
        const emailCandidate = await this.userService.getOneByEmail(dto.email)
        const userNameCandidate = await this.userService.getOneByUserName(dto.user_name)

        if (emailCandidate) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(dto.password, 3)

        if (userNameCandidate) {
            throw new HttpException('this username is used', HttpStatus.BAD_REQUEST)
        }

        const user = await this.userService.createUser({
            email: dto.email,
            password: hashedPassword,
            full_name: dto.full_name,
            user_name: dto.user_name
        })

        await this.mailService.sendRegistrationEmail(user.email)

        return user
    }

    async login(dto: LoginUserDto) {
        const user = await this.userService.getOneByEmail(dto.email)
        if (!user) {
            throw new HttpException('user not registered', HttpStatus.BAD_REQUEST)
        }

        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) {
            throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
        }

        const tokens = await this.jwtTokenService.generateTokens({id: user.id, email: user.email})

        return {user, ...tokens}
    }

    async refreshToken(refreshToken) {
        if(!refreshToken) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED)
        }

        const userData = await this.jwtTokenService.validateRefreshToken(refreshToken)
        if (!userData) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED)
        }

        const user = await this.userService.getOneByEmail(userData.email)
        const tokens = await this.jwtTokenService.generateTokens({id: user.id, email: user.email})

        return {user, ...tokens}
    }


}
