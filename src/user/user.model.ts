import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string,
    password: string;
}

@Table({tableName: 'user', freezeTableName: true, createdAt: true, updatedAt: false})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.TEXT, allowNull: false})
    password: string;

}
