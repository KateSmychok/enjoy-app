import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('api')
    .setVersion('1.0')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync("./swagger.json", JSON.stringify(swaggerDoc));
  SwaggerModule.setup('/api/docs', app, swaggerDoc);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
