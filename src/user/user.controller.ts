import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import {UserService} from "./user.service";
import {
    EmailValidation,
    PasswordValidation,
    UserNamesDto,
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

    @Patch()
    @UseGuards(LoginGuard)
    updateUser(@Body() updateUserDto: UserNamesDto, @Req() req) {
        const {id} = req.user
        return this.userService.updateUserNames(updateUserDto, id)
    }

    @Delete()
    @UseGuards(LoginGuard)
    deleteUser(@Req() req) {
        const {id} = req.user
        return this.userService.deleteUser(id)
    }

    @Post('follow/:id')
    @UseGuards(LoginGuard)
    followUser(@Param('id') id, @Req() req) {
        const user = req.user
        return this.userService.followUser(id, user.id)
    }


}
