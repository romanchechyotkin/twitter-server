import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UserService} from "./user.service";

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

    @Post()
    createUser(@Body() dto) {
        return this.userService.createUser(dto)
    }

    @Put('/:id')
    updateUser(@Body() dto, @Param('id') id) {
        return this.userService.updateUser(dto, id)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id) {
        return this.userService.deleteUser(id)
    }

}
