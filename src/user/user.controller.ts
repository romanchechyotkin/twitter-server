import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import {UserService} from "./user.service";
import {
    EmailValidation,
    FullNameValidation,
    PasswordValidation,
    UserNameValidation
} from "./dto/update-user.dto";
import {LoginGuard} from "../auth/login.guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Get('/:id')
    getOneUser(@Param('id') id) {
        return this.userService.getOneUser(id)
    }

    @Put('/email')
    @UseGuards(LoginGuard)
    updateUserEmail(@Body() emailDto: EmailValidation, @Req() req) {
        const {id} = req.user
        return this.userService.updateUserEmail(emailDto, id)
    }

    @Put('/password')
    @UseGuards(LoginGuard)
    updateUserPassword(@Body() passwordDto: PasswordValidation, @Req() req) {
        const {id} = req.user
        return this.userService.updateUserPassword(passwordDto, id)
    }

    @Put('/full-name')
    @UseGuards(LoginGuard)
    updateUserFullName(@Body() fullNameDto: FullNameValidation, @Req() req) {
        const {id} = req.user
        return this.userService.updateUserFullName(fullNameDto, id)
    }

    @Put('/user-name')
    @UseGuards(LoginGuard)
    updateUserUserName(@Body() userNameDto: UserNameValidation, @Req() req) {
        const {id} = req.user
        return this.userService.updateUserUserName(userNameDto, id)
    }

    @Delete()
    @UseGuards(LoginGuard)
    deleteUser(@Req() req) {
        const {id} = req.user
        return this.userService.deleteUser(id)
    }

}
