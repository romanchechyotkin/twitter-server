import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put, Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {UserService} from "./user.service";
import {
    EmailValidation,
    PasswordValidation,
    UserNamesDto,
} from "./dto/update-user.dto";
import {LoginGuard} from "../auth/login.guard";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getAllUsers(@Query('id') id) {
        return this.userService.getAllUsers(id)
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

    @Post('unfollow/:id')
    @UseGuards(LoginGuard)
    unfollowUser(@Param('id') id, @Req() req) {
        const user = req.user
        return this.userService.unfollowUser(id, user.id)
    }

    @Post('/avatar')
    @UseGuards(LoginGuard)
    @UseInterceptors(FilesInterceptor('file'))
    uploadAvatar(@Req() req, @UploadedFiles() files: Array<Express.Multer.File>) {
        const avatar = files[0]
        const user = req.user
        return this.userService.uploadAvatar(avatar, user.id)
    }

}
