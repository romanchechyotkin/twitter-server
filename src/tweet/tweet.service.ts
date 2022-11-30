import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tweet} from "./tweet.model";
import { UserService } from "../user/user.service";

@Injectable()
export class TweetService {

    constructor(@InjectModel(Tweet) private tweetModel: typeof Tweet,
                private userService: UserService) {}

    async getAllTweets() {
        return this.tweetModel.findAll()
    }

    async getAllUserTweets(user_id) {
        return this.tweetModel.findAll({where: {user_id}})
    }

    async getOneTweet(id) {
        return this.tweetModel.findOne({where: {id}})
    }

    async createTweet(dto) {
        const user = await this.userService.getOneUser(dto.user_id)
        const tweet = await this.tweetModel.create({text: dto.text, user_id: dto.user_id})
        await user.$add('tweets', [tweet.id])
        return tweet
    }

    async updateTweet(dto, id, user) {
        const user_id = user.id
        return this.tweetModel.update(dto, {where: {id, user_id}})
    }

    async deleteTweet(id, user) {
        const user_id = user.id
        return this.tweetModel.destroy({where: {id, user_id}})
    }

}
