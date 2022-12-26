import { Body, Controller, Get, Post, Req, Res, Param } from "@nestjs/common";
import {Response, Request} from "express";
import {AuthService} from "./auth.service";
import {RegistrationUserDto} from "./dto/registration-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/registration')
    registration(@Body() registrationDto: RegistrationUserDto) {
        return this.authService.registration(registrationDto)
    }

    @Get('/checkEmail/:email')
    async checkEmail(@Param('email') email) {
        return this.authService.checkEmail(email)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginUserDto, @Res({passthrough: true}) res: Response) {
        const userLoginData = await this.authService.login(loginDto)
        res.cookie('refreshToken', userLoginData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
        })
        return userLoginData
    }

    @Post('/logout')
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        res.clearCookie('refreshToken')
    }

    @Get('/refresh')
    async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refreshToken} = req.cookies
        const userData = await this.authService.refreshToken(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return userData
    }

}
