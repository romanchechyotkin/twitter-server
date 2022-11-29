import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser())

    const PORT = process.env.PORT || 5000

    await app.listen(PORT, () => {
        console.log(`server running on ${PORT} port`);
    });
}

bootstrap();
