import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getAllUsers() {
        return this.userModel.findAll()
    }

    async getOneUser(id) {
        return this.userModel.findOne({where: {id}})
    }

    async getOneByEmail(email) {
        return this.userModel.findOne({where: {email}})
    }

    async getOneByUserName(user_name) {
        return this.userModel.findOne({where: {user_name}})
    }

    async createUser(dto) {
        return this.userModel.create(dto)
    }

    async updateUserEmail(dto, id) {
        return this.userModel.update({email: dto.email}, {where: {id}})
    }

    async updateUserPassword(dto, id) {
        const user = await this.userModel.findOne({where: {id}})

        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) {
            throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
        }

        const newHashPassword = await bcrypt.hash(dto.newPassword, 3)

        return this.userModel.update({password: newHashPassword}, {where: {id}})
    }

    async updateUserFullName(dto, id) {
        return this.userModel.update({full_name: dto.full_name}, {where: {id}})
    }

    async updateUserUserName(dto, id) {
        return this.userModel.update({user_name: dto.user_name}, {where: {id}})
    }

    async deleteUser(id) {
        return this.userModel.destroy({where: {id}})
    }

}
