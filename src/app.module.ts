import {Module} from '@nestjs/common';
import {UserModule} from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user/user.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '5432',
            database: "twitter",
            synchronize: true,
            autoLoadModels: true,
            models: [User],
        }),
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        UserModule
    ],
})

export class AppModule {}
