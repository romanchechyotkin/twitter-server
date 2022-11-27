import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getAllUsers() {
        return this.userModel.findAll()
    }

    async getOneUser(id) {
        return this.userModel.findOne({where: {id}})
    }

    async createUser(dto) {
        return this.userModel.create(dto)
    }

    async updateUser(dto, id) {
        return this.userModel.update(dto, {where: {id}})
    }

    async deleteUser(id) {
        return this.userModel.destroy({where: {id}})
    }

}
