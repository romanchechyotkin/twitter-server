import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import {TweetService} from "./tweet.service";
import {LoginGuard} from "../auth/login.guard";
import {CreateTweetDto} from "./dto/create-tweet.dto";
import {UpdateTweetDto} from "./dto/update-tweet.dto";

@Controller('tweet')
export class TweetController {

    constructor(private tweetService: TweetService) {}

    @Get()
    getAllTweets() {
        return this.tweetService.getAllTweets()
    }

    @Get('/user/:id')
    getAllUserTweets(@Param('id') id) {
        return this.tweetService.getAllUserTweets(id)
    }


    @Get('/:id')
    getOneTweet(@Param('id') id) {
        return this.tweetService.getOneTweet(id)
    }

    @Post()
    @UseGuards(LoginGuard)
    createTweet(@Body() createTweetDto: CreateTweetDto,
                @Req() req,
    ) {
        const user = req.user
        // const file = files[0]
        return this.tweetService.createTweet({...createTweetDto, user_id: user.id})
    }

    @Put('/:id')
    @UseGuards(LoginGuard)
    updateTweet(@Param('id') id, @Body() updateTweetDto: UpdateTweetDto, @Req() req) {
        const user = req.user
        return this.tweetService.updateTweet(updateTweetDto, id, user)
    }

    @Delete('/:id')
    @UseGuards(LoginGuard)
    deleteTweet(@Param('id') id, @Req() req) {
        const user = req.user
        return this.tweetService.deleteTweet(id, user)
    }

    @Post('like/:id')
    @UseGuards(LoginGuard)
    likeTweet(@Param('id') id, @Req() req) {
        const user = req.user
        return this.tweetService.likeTweet(id, user._id)
    }

}
