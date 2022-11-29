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

    async createUser(dto) {
        return this.userModel.create(dto)
    }

    async updateUser(dto, id) {
        const user = await this.userModel.findOne({where: {id}})

        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) {
            throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
        }

        const newHashedPassword = await bcrypt.hash(dto.newPassword, 3)

        return this.userModel.update({email: dto.email, password: newHashedPassword}, {where: {id}})
    }

    async deleteUser(id) {
        return this.userModel.destroy({where: {id}})
    }

}
