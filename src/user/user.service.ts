import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as path from "path";
import * as fs from "fs";
import * as bcrypt from 'bcryptjs'
import * as uuid from 'uuid'

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getAllUsers() {
        return this.userModel.find()
    }

    async getOneUser(id) {
        return this.userModel.findOne({_id: id})
    }

    async getOneByEmail(email) {
        return this.userModel.findOne({email})
    }

    async getOneByUserName(user_name) {
        return this.userModel.findOne({user_name})
    }

    async createUser(dto) {
        return this.userModel.create(dto)
    }

    async updateUserEmail(dto, id) {
        return this.userModel.updateOne({id}, {email: dto.email})
    }

    async updateUserPassword(dto, id) {
        const user = await this.userModel.findOne({id})

        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) {
            throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
        }

        const newHashPassword = await bcrypt.hash(dto.newPassword, 3)

        return this.userModel.updateOne({id}, {password: newHashPassword})

    }

    async updateUserNames(dto, id) {
        const user = await this.userModel.findOne({user_name: dto.user_name})
        if (user) {
            throw new HttpException('this username is used', HttpStatus.BAD_REQUEST)
        }

        return this.userModel.findOneAndUpdate({id}, {full_name: dto.full_name, user_name: dto.user_name})
    }

    async deleteUser(id) {
        return this.userModel.remove({id})
    }

    async followUser(toFollowUserId, _id) {
        const userToFollow = await this.userModel.findOne({_id: toFollowUserId})
        if(!userToFollow) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }

        await this.userModel.updateOne({_id}, {$push: {'follows': toFollowUserId}})
        await this.userModel.updateOne({_id: toFollowUserId}, {$push: {'followers': _id}})

        return this.userModel.findOne({_id})
    }

    async unfollowUser(toUnfollowUserId, _id) {
        const userToFollow = await this.userModel.findOne({_id: toUnfollowUserId})
        if(!userToFollow) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }

        await this.userModel.updateOne({_id}, {$pull: {'follows': toUnfollowUserId}})
        await this.userModel.updateOne({_id: toUnfollowUserId}, {$pull: {'followers': _id}})

        return this.userModel.findOne({_id})
    }

    async uploadAvatar(avatar, userId) {
        const user = await this.userModel.findOne({_id: userId})

        const avatarName = uuid.v4() + '.jpg'

        const filePath = path.resolve(__dirname, '..', 'static')
        fs.writeFileSync(path.resolve(filePath, avatarName), avatar.buffer)

        user.avatar = avatarName
        await user.save()

        return user
    }

}
