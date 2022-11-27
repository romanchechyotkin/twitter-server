import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Tweet} from "./tweet.model";

@Injectable()
export class TweetService {

    constructor(@InjectModel(Tweet) private tweetModel: typeof Tweet) {}

    async getAllTweets() {
        return this.tweetModel.findAll()
    }

    async getOneTweet(id) {
        return this.tweetModel.findOne({where: {id}})
    }

    async createTweet(dto) {
      return this.tweetModel.create(dto)
    }

    async updateTweet(dto, id) {
        return this.tweetModel.update(dto, {where: {id}})
    }

    async deleteTweet(id) {
        return this.tweetModel.destroy({where: {id}})
    }

}
