import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";

interface TweetCreationAttrs {
  email: string,
  password: string;
}

@Table({tableName: 'tweet', freezeTableName: true, createdAt: true, updatedAt: true})
export class Tweet extends Model<Tweet, TweetCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    likes_amount: number;

}
