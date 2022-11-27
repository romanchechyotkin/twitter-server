import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();

    const PORT = process.env.PORT || 5000

    await app.listen(PORT, () => {
        console.log(`server running on ${PORT} port`);
    });
}

bootstrap();
