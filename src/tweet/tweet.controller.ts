import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {TweetService} from "./tweet.service";

@Controller('tweet')
export class TweetController {

    constructor(private tweetService: TweetService) {}

    @Get()
    getAllTweets() {
        return this.tweetService.getAllTweets()
    }

    @Get('/:id')
    getOneTweet(@Param('id') id) {
      return this.tweetService.getOneTweet(id)
    }

    @Post()
    createTweet(@Body() dto) {
      return this.tweetService.createTweet(dto)
    }

    @Put('/:id')
    updateTweet(@Param('id') id, @Body() dto) {
      return this.tweetService.updateTweet(dto, id)
    }

    @Delete('/:id')
    deleteTweet(@Param('id') id) {
      return this.tweetService.deleteTweet(id)
    }

}
