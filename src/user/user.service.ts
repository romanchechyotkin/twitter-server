import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import * as bcrypt from 'bcryptjs'
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

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

    }

}
