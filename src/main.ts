import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Todo APP')
    .setDescription('Todo API documentation')
    .setVersion('1.0')
    .addTag('Todo')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
