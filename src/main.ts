import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {useContainer} from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: true,
        })
    );
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true
        })
    );
    // @ts-ignore
    app.useGlobalInterceptors(ClassSerializerInterceptor)
    app.enableCors();
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    await app.listen(8080, '0.0.0.0');
}

bootstrap();
