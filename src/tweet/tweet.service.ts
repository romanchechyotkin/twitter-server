import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {UserService} from "../user/user.service";
import * as uuid from 'uuid'
import {InjectModel} from "@nestjs/mongoose";
import {Tweet, TweetDocument} from "./tweet.schema";
import { Model } from "mongoose";

@Injectable()
export class TweetService {

    constructor(@InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
                private userService: UserService) {}

    async getAllTweets() {
        // let tweets = await this.tweetModel.aggregate([
        //     {$match: {}},
        //     {$project: {
        //         "_id": 1,
        //         "text": 1,
        //         "likes": 1,
        //         "createdAt": 1,
        //         "user": 1
        //     }}
        // ])
        
        // await this.tweetModel.populate(tweets, {path: "user"})
        // console.log(tweets);
        
        // tweets = await this.tweetModel.aggregate([
        //     {$project: {
        //         "_id": 1,
        //         "text": 1,
        //         "likes": 1,
        //         "createdAt": 1,
        //         "user_name": "$user.user_name",
        //         "full_name": "$user.full_name",
        //     }}
        // ])
        const tweets = await this.tweetModel.find({}, {}, {sort: {date: -1}}).populate('user')
        return tweets
    }

    async getAllUserTweets(user_id) {
        return this.tweetModel.find({user: user_id}, {}, {sort: {date: -1}, limit: 5})
    }

    async getOneTweet(id) {
        return this.tweetModel.findOne({_id: id}).populate(['user', 'likes'])
    }

    async createTweet(dto) {
        const user = await this.userService.getOneUser(dto.user_id)
        if (!user) {
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED)
        }
        const date = new Date().toUTCString()
        return (await this.tweetModel.create({text: dto.text, user: dto.user_id, date: date})).populate('user')
    }

    async updateTweet(dto, id, user) {
        const user_id = user.id
        return this.tweetModel.findOneAndUpdate({_id: id, user: user_id}, {text: dto.text})
    }

    async deleteTweet(id, user) {
        const user_id = user.id
        return this.tweetModel.remove({_id: id, user: user_id})
    }

    async getAllLikesTweets(user_id) {
        const tweets = await this.tweetModel.find({
            likes: user_id
        }).populate(['likes', 'user'])
        return tweets
    }

    async likeTweet(id, user_id) {
        const tweet = await this.tweetModel.findOne({_id: id})
        const user = await this.userService.getOneUser(user_id)
        const _id = user._id
        if (!tweet) {
            throw new HttpException('tweet not found', HttpStatus.BAD_REQUEST)
        }

        const {likes} = tweet
        // @ts-ignore
        if (likes.includes(user._id)) {
            throw new HttpException('user already liked', HttpStatus.BAD_REQUEST)
        }

        return this.tweetModel.updateOne({_id: id}, {$push: {'likes': {_id}}})
    }

    async removeLikeTweet(id, user_id) {
        const tweet = await this.tweetModel.findOne({_id: id})
        const user = await this.userService.getOneUser(user_id)
        const _id = user._id
        if (!tweet) {
            throw new HttpException('tweet not found', HttpStatus.BAD_REQUEST)
        }

        const {likes} = tweet

        // @ts-ignore
        if (likes.includes(user._id)) {
            return this.tweetModel.updateOne({_id: id}, {$pull: {'likes': _id}})
        }

        throw new HttpException('user already delete like', HttpStatus.BAD_REQUEST)
    }

}
