import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
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

    @Put()
    @UseGuards(LoginGuard)
    updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
        const {id} = req.user
        return this.userService.updateUser(updateUserDto, id)
    }

    @Delete()
    @UseGuards(LoginGuard)
    deleteUser(@Req() req) {
        const {id} = req.user
        return this.userService.deleteUser(id)
    }

}
