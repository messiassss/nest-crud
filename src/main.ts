import { NestFactory } from '@nestjs/core';
import { UserModule } from './module/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
