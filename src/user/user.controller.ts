import {Body, Controller, Delete, Get, Param, Put} from "@nestjs/common";
import {UserService} from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

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

    @Put('/:id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id) {
        return this.userService.updateUser(updateUserDto, id)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id) {
        return this.userService.deleteUser(id)
    }

}
